'use strict'

var common = require('./command_pattern_common.js');

var advertisint_intervals = [
  "0: 100ms", "1: 152.5ms", "2: 211.25ms", "3: 318.75ms",
  "4: 417.5ms", "5: 546.25ms", "6: 760ms", "7: 852.5ms",
  "8: 1,022.5ms", "9: 1,285ms", "A: 2,000ms", "B: 3,000ms",
  "C: 4,000ms", "D: 5,000ms", "E: 6,000ms", "F: 7,000ms"
];

var advertising_types = [
  "0: Advertising, ScanResponse and Connectable",
  "1: Only allow last device connect in 1.28 seconds",
  "2: Only allow Advertising and ScanResponse",
  "3: Only allow Advertising"
];

var switch_status = [
  "0: Off",
  "1: On"
];

module.exports = {
  ADC: {
    id: 2,
    desc: "Module Address",
    get: {
      params: [{
        name: "PIO#",
        desc: "map to PIO3~PIOB",
        pattern: /[3-B]/
      }],
      result: {
        prefix: "OK+ADC",
        value: {
          desc: "PIO voltage",
          pattern: /0.00/
        }
      }
    }
  },
  ADDR: common.get(3, "ADDR", "MAC Address", "MAC Address", /[W]+12/),
  ADVI: common.getset(3, "Advertising Interval", advertisint_intervals, /[0-F]/),
  ADTY: common.getset(4, "Advertising Type", advertising_types, /[0-3]/),
  ANCS: common.getset(5, "ANCS Switch", switch_status, /[0|1]/),
  ALLO: common.getset(6, "Whitelist Switch", switch_status, /[0|1]/),
  AD: { /* TODO implement AD command */
    id: 7,
    desc: "Whitelist MAC Address",
    get: {
      params: [{
        name: "N'th Whitelist",
        desc: "1, 2, or 3",
        pattern: /[0|1|2]/
      }],
      result: {
        prefix: "OK+Get:",
        value: {
          desc: "N'th Whitelist MAC Address",
          pattern: /[W]+12/
        }
      }
    },
    set: {
      params: [{
        name: "N'th Whitelist",
        desc: "1, 2, or 3",
        pattern: /[0|1|2]/
      }, {
        name: "MAC Address",
        desc: "MAC Address",
        pattern: /[W]+12/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: "N'th Whitelist MAC Address",
          pattern: /[W]+12/
        }
      }
    }
  },
  BEFC: common.getset(8, "Module Pin Output State, After Power Supplied.", "PIO Map (Left -> Right)", /[X]+3/),
  AFTC: common.getset(9, "Module Pin Output State, After Connection is Established.", "PIO Map (Left -> Right)", /[X]+3/),
  BATC: common.getset(10, "Battery Monitor Switch", switch_status, /[0|1]/),
};
