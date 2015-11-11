'use strict'

var common = require('./command_pattern_common.js');

module.exports = {
  PARI: common.getset(41, "Parity Bit", [
    "0: None",
    "1: Even",
    "2: Odd"
  ], /[0|1|2]/),
  PIO1: common.getset(42, "PIO1 Output Status (System LED)", [
    "0: Unconnected Output 500ms High 500ms Low, Connected Output High",
    "1: Unconnected Output Low, Connected Output High",
  ], /[0|1]/),
  PASS: common.getset(44, "Pin Code", "Pin Code", /[999999]/),
  POWE: common.getset(45, "Module Power", [
    "0: -23dbm",
    "1: -6dbm",
    "2: 0dbm",
    "3: 6dbm",
  ], /[0|1|2|3]/),
  PWRM: common.getset(46, "Module Sleep Type", [
    "0: Auto Sleep",
    "1: Don't Auto Sleep",
  ], /[0|1]/),
  RELI: common.getset(47, "Reliable Advertising Mode", [
    "0: Normal Advertising",
    "1: Reliable Advertising",
  ], /[0|1]/),
  RENEW: common.command(48, "Restore all setup value to factory setup"),
  RESET: common.command(49, "Restart Module"),
  ROLE: common.getset(50, "Master and Slave Role", [
    "0: Peripheral",
    "1: Central",
  ], /[0|1]/),
};
