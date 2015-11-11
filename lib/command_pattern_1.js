'use strict'

var common = require('./command_pattern_common.js');

module.exports = {
  BATT: common.get(11, "Battery Information", "Battery Information", /0+3/, "OK+Get:"),
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
  CLEAR: common.command(15, "Clear Last Connected Device Address"),
  CONNL: common.get(16, "Try to connect to last succeeded device", [
    "L: Connecting",
    "E: Connect Error",
    "F: Connect Fail",
    "N: No Address"
  ], /[L|E|F|N]/, "OK+CONN:"),
  'COL?': common.get(18, "PIO04~PIO11 input(output) state", "PIO04~PIO11 input(output) state", /0x99/, "OK+Col:"),
  'CYC?': common.get(19, "PIO collection rate", "00-99 seconds", /0x99/),
  'CYC': common.set(19, "PIO collection rate", "00-99 seconds", /0x99/),
  DISC: common.get(20, "Start a device discovery scan", [
    "S: Start discovery",
    "E: End discovery",
  ], /[S|E]/, "OK+DISC:"),
};
