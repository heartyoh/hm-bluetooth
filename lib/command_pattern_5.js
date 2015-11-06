'use strict'

var common = require('./command_pattern_common.js');

var stopbits = [
  "0: One stop bit",
  "1: Two stop bit"
];

module.exports = {
  RAT: common.getset(53, "Module Sensor Work Interval", "00~99: minutes", /[00-99]/), // CONFIRMME 값 패턴이 특이함. 확인후 수정할 것.
  STOP: common.getset(54, "Stop Bit", stopbits, /[0|1]/),
  START: common.command(55, "START", "Work Immediately"),
  SLEEP: common.command(56, "SLEEP", "Go into Sleep Mode"),
  SAVE: common.getset(57, "Module Save Connected Address Parameter", [
    "0: Save When Connected",
    "1: Don't Save",
  ], /[0|1]/),
  SENS: common.getset(58, "Sensor Type on Module PIO11(HM-11 is PIO3)", [
    "0: None",
    "1: DHT11",
    "2: DS18B20"
  ], /[0|1|2]/),
  SHOW: common.getset(59, "Discovery Parameter", [
    "0: Don't show name",
    "1: Show name",
  ], /[0|1]/),
};
