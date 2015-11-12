'use strict'

var common = require('./command_pattern_common.js');

var switch_status = [
  "0: Off",
  "1: On"
];

module.exports = {
  CONN: common.command(21, "Connect to an Discovery device", [
    "E: Link Error",
    "F: Link Failed",
    "N: No Address",
    "0~5: Try to Connect"
  ], "OK+CONN", [{
    name: "Discovered Device #",
    desc: "Discovered Device # 0~5",
    pattern: /[0|1|2|3|4|5]/
  }]),
  DELO: common.getset(22, "iBeacon deploy mode", [
    "1: Allowed to broadcast and scanning",
    "2: Only allow broadcast"
  ], /[0|1]/, null, "OK+DELO"), // TODO prefix가 다른 패턴임. 지원할 수 있도록..
  FLAG: common.set(23, "Advertising data FLAG byte", "0~FF (one byte)", /[XX]/),
  FILT: common.getset(24, "Filter of HM modules", [
    "0: Will find all BLE modules",
    "1: Only find HM modules"
  ], /[0|1]/),
  ERASE: common.command(25, "Remove bond information"),
  FLOW: common.getset(26, "Flow Control Switch", [
    "0: Off",
    "1: On"
  ], /[0|1]/),
  HELP: common.get(27, "System Help Information", "System Help Information", /\W/, ""),
  FLOW: common.getset(28, "Module Work Type", [
    "0: When power on, work immediately",
    "1: When module is powered on, only respond the AT Command, don't do anything until AT+START is received, or can use AT+CON, AT+CONNL",
  ], /[0|1]/),
  IBEA: common.getset(29, "Module iBeacon Switch", switch_status, /[0|1]/),
  IBE0: common.getset(30, "iBeacon UUID", "iBeacon UUID", /0x[0]+8/),
};
