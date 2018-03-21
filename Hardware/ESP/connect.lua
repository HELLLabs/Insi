local module = {}
local ct = 0
local creds = {}

local function Wifiinfo()
  if wifi.sta.getip() == nil then
    print("connecting to network...")
  else
    tmr.stop(1)
    tmr.stop(2)
    print("Connected, IP - " .. wifi.sta.getip())
    app.start()
  end
end

local function resDevice()
  print("restarting device...")
  node.restart()
end

local function connectWifi(aps)
  ct = ct+1
  if aps then
    for k, v in pairs(aps) do
      if config.SSID and config.SSID[k] then
        creds.ssid = k
        creds.pwd = config.SSID[k]
        wifi.sta.config(creds)
        wifi.sta.connect()
        print("trying to connect " .. k .. "...")
        tmr.alarm(1, 3500, 1, Wifiinfo)
      end
    end
  else
    if (ct < 20) then
      print("error connecting wifi...\ntrying to reconnect...")
      wifi.sta.getap(connectWifi)
    else
      print("Error 408... contact HELL Labs representative")
      tmr.alarm(2, 8000, 1, resDevice)
    end
  end
end

function module.start()
  print("configuring wifi...")
  wifi.setmode(wifi.STATION)
  wifi.sta.getap(connectWifi)
end

return module
