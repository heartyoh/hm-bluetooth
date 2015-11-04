'use strict'

var switch_status = [
  "0: Off",
  "1: On"
];

module.exports = {
  IBEA: {
    id: 29,
    desc: "Module iBeacon Switch",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        },
        length: 8
      }
    },
    set: {
      params: [{
        name: "On/Off",
        desc: switch_status,
        pattern: /[0|1]/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: switch_status,
          pattern: /[0|1]/
        },
        length: 8
      }
    }
  },
  IBE0: {
    id: 30,
    desc: "iBeacon UUID",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: "iBeacon UUID",
          pattern: /0x[0]+8/
        },
        length: 17
      }
    },
    set: {
      params: [{
        name: "iBeacon UUID",
        desc: "iBeacon UUID",
        pattern: /[0]+8/
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: "iBeacon UUID",
          pattern: /0x[0]+8/
        },
        length: 17
      }
    }
  },
};
