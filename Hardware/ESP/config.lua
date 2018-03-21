local module = {}
module.SSID = {}
-- custom APs below
module.SSID["a"] = "passwordhere"

-- server settings below
module.HOST = "db-host-here"
module.MQTT = "mqtt-host-here"
module.PORT = 12345
module.USER = "user"
module.PASS = "pass"
-- module.DEBUG = "ws://echo.websocket.org"

-- variables dependent 
module.ID = node.chipid()
module.SUB = "rajhack/data"

-- pin configuration
co2_in = 2 -- equipment 1
temp_in = 0 -- equipment 2
device_state = 6 -- equipment 3
thermo_state = 7 -- equipment 4

debug_thermo = 8
debug_rod = 5

gpio.mode(co2_in, gpio.INT, gpio.PULLUP)
gpio.mode(device_state, gpio.INT, gpio.PULLUP)
gpio.mode(thermo_state, gpio.INT, gpio.PULLUP)

gpio.mode(debug_rod, gpio.OUTPUT)
gpio.mode(debug_thermo, gpio.OUTPUT)

gpio.write(temp_in, gpio.LOW)
gpio.write(debug_thermo, gpio.LOW)
gpio.write(debug_rod, gpio.LOW)



return module