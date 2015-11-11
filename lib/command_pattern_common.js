'use strict'

/*
 * 커맨드 형태의 프로토콜이다.
 * 결과 값은 보통 OK+명령어 이지만, 항상 그렇지는 않다.
 */
function command(id, desc, value_desc, prefix, params) {

  return {
    id: id,
    desc: desc,
    command: {
      params: params,
      result: {
        prefix: prefix == undefined ? "OK+" : prefix,
        value: {
          desc: value_desc || desc,
          pattern: /\W/
        }
      }
    }
  }
}

/*
 * 설정 또는 상태값을 Query하는 명령 패턴임.
 * result_prefix은 고정된 패턴이 없다.
 * 대부분은 파라미터가 없으나, 간혹 있는 경우도 있어서, params 파라미터를 사용하도록 한다.
 */
function get(id, desc, value_desc, value_pattern, result_prefix, params) {
  return {
    id: id,
    desc: desc,
    get: {
      params: params,
      result: {
        prefix: result_prefix == undefined ? "OK+Get:" : result_prefix,
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    }
  }
}

/*
 * 설정 또는 상태값을 Update하는 명령 패턴임.
 */
function set(id, desc, value_desc, value_pattern, result_prefix, params) {
  return {
    id: id,
    desc: desc,
    set: {
      params: params,
      result: {
        prefix: result_prefix == undefined ? "OK+Set:" : result_prefix,
        value: {
          desc: value_desc,
          pattern: value_pattern
        }
      }
    }
  }
}

function getset(id, desc, value_desc, value_pattern, get_prefix, set_prefix) {
  return {
    id: id,
    desc: desc,
    get: {
      result: {
        prefix: (get_prefix == undefined ? "OK+Get:" : get_prefix),
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
        prefix: (set_prefix == undefined ? "OK+Set:" : set_prefix),
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
