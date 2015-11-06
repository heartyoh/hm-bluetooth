'use strict'

function command(id, name, desc) {
  return {
    id: id,
    desc: desc,
    set: {
      result: {
        prefix: "OK+",
        value: {
          desc: desc,
          pattern: name
        }
      }
    }
  }
}

function get(id, name, desc, value_desc, value_pattern) {
  return {
    id: id,
    desc: desc,
    get: {
      result: {
        prefix: "OK+" + name + ":",
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    }
  }
}

function set(id, desc, value_desc, value_pattern) {
  return {
    id: id,
    desc: desc,
    set: {
      result: {
        prefix: "OK+",
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    }
  }
}

function getset(id, desc, value_desc, value_pattern) {
  return {
    id: id,
    desc: desc,
    get: {
      result: {
        prefix: "OK+Get:",
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    },
    set: {
      params: [{
        name: desc,
        desc: value_desc,
        pattern: value_pattern
      }],
      result: {
        prefix: "OK+Set:",
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    }
  };
}

module.exports = {
  command: command,
  get: get,
  set: set,
  getset: getset
};
