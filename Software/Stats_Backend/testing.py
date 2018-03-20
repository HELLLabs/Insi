from collections import deque

import numpy as np
import pandas as pd
from pymongo import MongoClient

client = MongoClient(
    "mongodb://adarsh:Adarsh112233@ds233748.mlab.com:33748/test_db")
db = client.test_db

data = pd.DataFrame(list(db.datas.find({})))
data = data.iloc[:, 2:]
data.set_index(pd.DatetimeIndex(data.date), inplace=True)
data.head()
demo = data.loc['2018-03-18']


# dayUsage = deque()

def calc(qu, summer):
    if len(qu) > 1:
        d = np.abs(qu[1] - qu[0])
        summer.append(d)
        qu.popleft()
        return qu, summer
    else:
        return qu, summer


def daily_uptime(dataf):
    summer = list()
    qu = deque()
    for x in range(len(dataf) - 1):
        if dataf.device_state[x] == 1:
            qu.append(dataf.date[x])
            (qu, summer) = calc(qu, summer)
        elif dataf.device_state[x] == 0 and dataf.device_state[x - 1] == 1:
            qu.append(dataf.date[x])
            (qu, summer) = calc(qu, summer)
            qu.clear()
        else:
            qu.clear()
    return summer


ans = daily_uptime(demo)
print(ans)
