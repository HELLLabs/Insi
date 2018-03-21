local module = {}
m = nil
oldData = 0

local function pinger()
  print('')
end

local function subs()
  m:subscribe(config.SUB, 0, function(client) print("sub ok") end)
end

local function statUpdater(lev, equ)
  data = {}
  data["co2"] = gpio.read(co2_in)
  data["device_state"] = gpio.read(device_state)
  data["thermo_state"] = gpio.read(thermo_state)
  if (data["temp"]) then

  else
    data["temp"] = 0
  end
  -- Add all returning json data here
  data[equ] = lev
  json_data = sjson.encode(data)
  http.post(config.HOST,
  'Content-Type: application/json\r\n',
  json_data,
  function(code, data)
    if (code < 0) then
      print(code, data)
    else
      print(code, data)
    end
  end)
end

local function check_temp()
  new_readings = adc.read(temp_in)
  new_readings = new_readings*.0932
  if (math.abs(oldData-new_readings) > 2) then
    statUpdater(new_readings, "temp")
  end
  oldData = new_readings
end


local function initSockets()
  m = mqtt.Client(config.ID, 10, config.USER, config.PASS)
  m:on("offline", function(client)
    tmr.stop(1)
    print("disconnected, attempting to connect again...")
    connect.start()
  end)
  m:on("message", function(client, topic, data)
    if data == "thermo1" then -- ac on
      -- print('thermo0')
      gpio.write(debug_thermo, gpio.LOW)
    elseif data == "rod1" then -- ac off
      -- print('rod0')
      gpio.write(debug_rod, gpio.LOW)
    else 
      -- print("else")
      gpio.write(debug_rod, gpio.HIGH)
      gpio.write(debug_thermo, gpio.HIGH)
    end
  end)
  m:connect(config.MQTT, config.PORT, 0, function(client)
    print("host connected")
    subs()
  end)
  tmr.stop(1)
  tmr.alarm(1, 9000, 1, pinger)
  tmr.alarm(2, 2000, 1, check_temp)

  gpio.trig(co2_in, "both", function(leve)
    if leve == 1 then
      statUpdater(1, "co2")
    else
      statUpdater(0, "co2")
    end
  end)
  gpio.trig(device_state, "both", function(leve)
    if leve == 1 then
      statUpdater(1, "device_state")
    else
      statUpdater(0, "device_state")
    end
  end)
  gpio.trig(thermo_state, "both", function(leve)
    if leve == 1 then
      statUpdater(1, "thermo_state")
    else
      statUpdater(0, "thermo_state")
    end
  end)
end

function module.start()
  initSockets()
end

return module