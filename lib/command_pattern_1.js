'use strict'

module.exports = {
  BATT: {
    id: 11,
    desc: "Battery Information",
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: "Battery Information",
          pattern: /0+3/
        },
        length: 10
      }
    }
  },
};
