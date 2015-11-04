'use strict'

module.exports = {
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
