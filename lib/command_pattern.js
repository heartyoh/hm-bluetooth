'use strict'

module.exports = [
  require('./command_pattern_0'),
  require('./command_pattern_1'),
].reduce(function(pattern, sum) {
  for(var key in pattern) {
    sum[key] = pattern[key];
  }
  return sum;
}, {});
