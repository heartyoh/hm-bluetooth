'use strict'

var SerialConnect = require('./lib/serial_connect');

var stdin = process.openStdin();

var connect = new SerialConnect('/dev/tty.usbserial');

connect.open(function(err) {
  if(err) {
    console.log('err');
    return;
  }

  connect.get('VERR?');
});
