'use strict'

module.exports = [0, 1, 2, 3, 4, 5, 6, 7].map(function(i) {
  return require('./command_pattern_' + i);
}).reduce(function(pattern, sum) {
  for(var key in pattern) {
    sum[key] = pattern[key];
  }
  return sum;
}, {});
