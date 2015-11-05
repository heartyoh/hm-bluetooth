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
  ADDR: {
    id: 3,
    desc: "MAC Address",
    get: {
      result: {
        prefix: "OK+ADDR:",
        value: {
          desc: "MAC Address",
          pattern: /[W]+12/
        }
      }
    }
  },
  ADVI: {
    id: 3,
    desc: "Advertising Interval",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: advertisint_intervals,
          pattern: /[0-F]/
        }
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
        }
      }
    }
  },
  ADTY: {
    id: 4,
    desc: "Advertising Type",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: advertising_types,
          pattern: /[0-3]/
        }
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
          desc: advertising_types,
          pattern: /[0-3]/
        }
      }
    }
  },
  ANCS: {
    id: 5,
    desc: "ANCS Switch",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    },
    set: {
      params: [{
        name: "Type",
        desc: switch_status,
        pattern: /[0|1]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    }
  },
  ALLO: {
    id: 6,
    desc: "Whitelist Switch",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    },
    set: {
      params: [{
        name: "Switch",
        desc: switch_status,
        pattern: /[0|1]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    }
  },
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
  BEFC: {
    id: 8,
    desc: "Module Pin Output State, After Power Supplied.",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: "PIO Map (Left -> Right)",
          pattern: /[X]+3/
        }
      }
    },
    set: {
      params: [{
        name: "PIO Map (Left -> Right)",
        desc: "PIO Map (Left -> Right)",
        pattern: /[X]+3/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: "PIO Map (Left -> Right)",
          pattern: /[X]+3/
        }
      }
    }
  },
  AFTC: {
    id: 9,
    desc: "Module Pin Output State, After Connection is Established.",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: "PIO Map (Left -> Right)",
          pattern: /[X]+3/
        }
      }
    },
    set: {
      params: [{
        name: "PIO Map (Left -> Right)",
        desc: "PIO Map (Left -> Right)",
        pattern: /[X]+3/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: "PIO Map (Left -> Right)",
          pattern: /[X]+3/
        }
      }
    }
  },
  BATC: {
    id: 10,
    desc: "Battery Monitor Switch",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    },
    set: {
      params: [{
        name: "Switch",
        desc: switch_status,
        pattern: /[0|1]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        }
      }
    }
  }
};
