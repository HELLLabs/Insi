import numpy as np
from collections import deque
import pandas as pd
from pymongo import MongoClient
from flask import Flask, request, Response, make_response, jsonify
from flask_restful import Resource, Api

# client = MongoClient(
#     "mongodb+srv://admin:<PASSWORD>@logger-server-ysh8f.mongodb.net/test")
client = MongoClient(
    "mongodb://admin:ThisIsPassWord@logger-server-shard-00-00-ysh8f.mongodb.net:27017,"
    "logger-server-shard-00-01-ysh8f.mongodb.net:27017,"
    "logger-server-shard-00-02-ysh8f.mongodb.net:27017/test?ssl=true&replicaSet=logger-server-shard-0&authSource"
    "=admin")
db = client.test
app = Flask(__name__)
api = Api(app)


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


# Total uptime per day // helper function
def calc(qu, summer):
    if len(qu) > 1:
        d = np.abs(qu[1] - qu[0])
        summer.append(d)
        qu.popleft()
        return qu, summer
    else:
        return qu, summer


# Total uptime per day // main function
def daily_uptime(data):
    summer = list()
    qu = deque()
    for x in range(len(data) - 1):
        if data.device_state[x] == 1:
            qu.append(data.date[x])
            (qu, summer) = calc(qu, summer)
        elif data.device_state[x] == 0 and data.device_state[x - 1] == 1:
            qu.append(data.date[x])
            (qu, summer) = calc(qu, summer)
            qu.clear()
        else:
            qu.clear()
    return summer


# Daily geyser temperature records + uptime records
def daily_geyser_temp(data):
    date_with_temp = dict()
    done = list()
    for x in range(len(data.date)):
        sig = str(data.date[x])
        hdate = str(data.date[x].date())
        temp_list = data.loc[hdate]
        if sig not in done and data.device_state[x] == 1:
            if hdate in date_with_temp:
                date_with_temp[hdate]["total_obs"].append(data.temp[x])
                #             date_with_temp[hdate].append(data.temp[x])
                done.append(sig)
                date_with_temp[hdate].update({"avg": np.median(date_with_temp[hdate]['total_obs'])})
                date_with_temp[hdate].update({"uptime": sum([time_diff.seconds for time_diff in
                                                             daily_uptime(temp_list)])})
            else:
                date_with_temp[hdate] = {"total_obs": [data.temp[x]]}
                #             date_with_temp[hdate] = [data.temp[x]]
                done.append(sig)
                date_with_temp[hdate].update({"avg": np.median(date_with_temp[hdate]['total_obs'])})
                date_with_temp[hdate].update({"uptime": sum([time_diff.seconds for time_diff in
                                                             daily_uptime(temp_list)])})
        else:
            pass
    # device is off here
    return date_with_temp


# Most and Least active day
def most_least_active(data):
    day_count_ = pd.DataFrame([x.weekday_name for x in data.date], columns=["days"])
    day_count_ = day_count_.days.value_counts()
    most_and_least = {
        ("most" if np.max(day_count_) == day_count_[x] else "least"):
            ({"day": str(x), "frequency": str(day_count_[x])} if np.min(day_count_) == day_count_[x] else
             {"day": str(x), "frequency": str(day_count_[x])}) for x in day_count_.keys()
        }
    return most_and_least


# Total power used till date
def avg_running_time(data):
    return np.around(np.average([data[x]["uptime"] for x in data]), 3)
    # return str(np.around(np.sum([data[x]["avg"] for x in data]), 3))


class SendStats(Resource):
    def get(self):
        data = pd.DataFrame(list(db.logs.find({})))
        data = data.iloc[:, 2:]
        data.set_index(pd.DatetimeIndex(data.date), inplace=True)
        # print(data)
        daily_temp_uptime = daily_geyser_temp(data)
        most_least = most_least_active(data)
        sample_date = {"temp_uptime": daily_temp_uptime, "active_day": most_least, "avg_running_time": avg_running_time(
            daily_temp_uptime)}
        return sample_date


class ChartStats(Resource):
    def get(self):
        data = pd.DataFrame(list(db.logs.find({})))
        data = data.iloc[:, 2:]
        data.set_index(pd.DatetimeIndex(data.date), inplace=True)
        daily_temp_uptime = daily_geyser_temp(data)
        send_data = dict()
        send_data["labels"] = [str(x) for x in daily_temp_uptime]
        send_data["datasets"] = [{"label": "Uptime", "data": [daily_temp_uptime[x]['avg'] for x in daily_temp_uptime]}]
        char_data = jsonify(send_data)
        return char_data


api.add_resource(SendStats, '/getStats')
api.add_resource(ChartStats, '/chartStats')

if __name__ == '__main__':
    app.run(debug=True)
