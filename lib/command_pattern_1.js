'use strict'

var common = require('./command_pattern_common.js');

module.exports = {
  BATT: common.get(11, "Get", "Battery Information", "Battery Information", /0+3/),
  BIT7: common.getset(12, "Bit Format", [
    "0: Not compatible",
    "1: Compatible"
  ], /0|1/),
  BAUD: common.getset(13, "Baud Rate", [
    "0: 9600",
    "1: 19200",
    "2: 38400",
    "3: 57600",
    "4: 115200",
    "5: 4800",
    "6: 2400",
    "7: 1200",
    "8: 230400",
  ], /[0-8]/),
  CHAR: common.getset(14, "Characteristic", "0x0001 ~ 0xFFFE (Default:0xFFE1)", /0x[XXXX]/),
  CLEAR: common.command(15, "CLEAR", "Clear Last Connected Device Address"),
  CONNL: common.get(16, "CONN", "Try to connect to last succeeded device", [
    "L: Connecting",
    "E: Connect Error",
    "F: Connect Fail",
    "N: No Address"
  ], /[L|E|F|N]/),
  DISC: common.get(20, "DISC", "Start a device discovery scan", [
    "S: Start discovery",
    "E: End discovery",
  ], /[S|E]/),
};
