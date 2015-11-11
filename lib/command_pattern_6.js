'use strict'

var common = require('./command_pattern_common.js');

module.exports = {
  TEMP: common.get(61, "DS18B20 Sensor or IC Temperature", "000.000 ~ 255.000", /[999.999]/, "OK+Get:"),
  TCON: common.getset(62, "Module connect remote device timeout value", "Timeout Value(000000~999999)", /[000000-999999]/),
  TYPE: common.getset(63, "Module Bond Mode", [
    "0: Not need PIN Code",
    "1: Auth not need PIN",
    "2: Auth with PIN",
    "3: Auth and bond"
  ], /[0|1|2|3]/),
  UUID: common.getset(64, "Service UUID", "0x0001~0xFFFE", /0x[XXXX]/),
  UART: common.getset(65, "UART Sleep Type", [
    "0: When module into sleep mode, you can wake up module through UART",
    "1: When module into sleep mode, shutdown UART too"
  ], /[0|1]/),
  VERR: common.get(66, "Software Version", "Software Version", /[W]+12/, ""),
  VERS: common.get(66, "Software Version", "Software Version", /[W]+12/, ""),
};
