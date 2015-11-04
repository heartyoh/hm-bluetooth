'use strict'

var SerialConnect = require('../lib/serial_connect');

var stdin = process.openStdin();

// var connect = new SerialConnect('/dev/tty.usbserial');
var connect = new SerialConnect('/dev/ttyUSB0');

connect.open();

stdin.addListener("data", function(d) {
  var command = d.toString().trim();
  command = command.toUpperCase();

  switch(command) {
    case 'CLOSE':
      connect.close(function() {
        process.exit();
      });
      return;
    default:
      if(command.indexOf('GET') == 0)
        connect.get.apply(connect, command.split(' ').slice(1));
      else if(command.indexOf('SET') == 0)
        connect.set.apply(connect, command.split(' ').slice(1));
      break;
  }
});

process.on('exit', function(code) {
  console.log('About to exit with code:', code);
});
