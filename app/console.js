'use strict'

var SerialConnect = require('../lib/serial_connect');

var stdin = process.openStdin();

var connect = new SerialConnect('/dev/tty.usbserial');

connect.open();

stdin.addListener("data", function(d) {
  var command = d.toString().trim();
  switch(command) {
    case 'close':
      connect.close();
      return;
    default:
    connect.get(d.toString().trim());
  }
});
