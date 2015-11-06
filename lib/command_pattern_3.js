'use strict'

var common = require('./command_pattern_common.js');

module.exports = {
  IBE1: common.getset(31, "iBeacon UUID", "00000001~FFFFFFFE (Default: B6444520)", /[\X]8+/),
  IBE2: common.getset(32, "iBeacon UUID", "00000001~FFFFFFFE (Default: 8F0C720E)", /[\X]8+/),
  IBE3: common.getset(33, "iBeacon UUID", "00000001~FFFFFFFE (Default: AF059935)", /[\X]8+/),
  MARJ: common.getset(34, "Module iBeacon Major Version", "0x0001~0xFFFE (Default: FFE0)", /[\X]4+/),
  MINO: common.getset(35, "Module iBeacon Minor Version", "0x0001~0xFFFE (Default: FFE1)", /[\X]4+/),
  MEAS: common.getset(36, "Module iBeacon Measured Power", "0x0001~0xFFFE (Default: FFE1)", /[\X]4+/),
  MODE: common.getset(37, "Module Work Mode", [
    "0: Transmission Mode",
    "1: PIO collection Mode + Mode 0",
    "2: Remote Control Mode + Mode 0"
  ], /[0|1]/),
  NOTI: common.getset(38, "Notify Information", [
    "0: Don't Notify",
    "1: Notify"
  ], /[0|1]/),
  NAME: common.getset(39, "Module Name", "Max Length is 12", /[W]12+/), //FIXME Different Pattern이므로 수정할 것.
  PCTL: common.getset(40, "Output Driver Power", [
    "0: Normal Power Output",
    "1: Max Power Output"
  ], /[0|1]/),
};
