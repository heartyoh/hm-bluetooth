'use strict'

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

module.exports = {
  ADC: {
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
        },
        length: 12
      }
    }
  },
  ADDR: {
    desc: "Module Address",
    get: {
      result: {
        prefix: "OK+ADDR:",
        value: {
          desc: "MAC Address",
          pattern: /[W]+12/
        },
        length: 20
      }
    }
  },
  ADVI: {
    desc: "Advertising Interval",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: advertisint_intervals,
          pattern: /[0-F]/
        },
        length: 8
      }
    },
    set: {
      params: [{
        name: "Interval",
        desc: advertisint_intervals,
        pattern: /[0-F]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: advertisint_intervals,
          pattern: /[0-F]/
        },
        length: 8
      }
    }
  },
  ADTY: {
    desc: "Advertising Type",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: advertisint_intervals,
          pattern: /[0-3]/
        },
        length: 8
      }
    },
    set: {
      params: [{
        name: "Type",
        desc: advertising_types,
        pattern: /[0-3]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: advertisint_intervals,
          pattern: /[0-3]/
        },
        length: 8
      }
    }
  },
  VERR: {
    desc: "Software Version",
    get: {
      result: {
        prefix: "",
        value: {
          desc: "Software Version",
          pattern: /[W]+12/
        },
        length: 11
      }
    }
  },
  VERS: {
    desc: "Software Version",
    get: {
      result: {
        prefix: "",
        value: {
          desc: "Software Version",
          pattern: /[W]+12/
        },
        length: 11
      }
    }
  }
};
