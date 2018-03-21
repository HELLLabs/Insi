function main()
  print("Welcome to HELL Labs")
  app = require("app")
  config = require("config")
  connect = require("connect")
  connect.start()
end

tmr.stop(1)
tmr.alarm(1, 2000, tmr.ALARM_SINGLE, main)
