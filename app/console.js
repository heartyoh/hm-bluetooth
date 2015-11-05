'use strict'

var Help = require('./help');
var SerialPort = require('serialport');
var SerialConnect = require('../lib/serial_connect');
var CommandPattern = require('../lib/command_pattern');

// var connect = new SerialConnect('/dev/tty.usbserial');
var connect = new SerialConnect('/dev/ttyUSB0');

connect.open(function(err) {
  if(err) {
    console.error('Open error : ' + err);
    process.exit(-1);
    return;
  }

  main();
});

process.on('exit', function(code) {
  // console.log('About to exit with code:', code);
});

function prompt() {
  process.stdout.write('❤ ');
}

function main() {

  var stdin = process.openStdin();

  /* set command complete callback */
  connect.on('complete', function(data) {
    console.log(data);
    prompt();
  });

  connect.on('error', function(error) {
    console.error(error);
    prompt();
  });

  stdin.addListener("data", function(d) {
    var command = d.toString().trim();
    command = command.toUpperCase();

    var first = command.split(' ')[0];

    switch(first) {
      case 'H':
      case 'HELP':
        Help.print(command.split(' ')[1]);
        prompt();
        break;

      case 'P':
      case 'PORTS':
        SerialPort.list(printSerialPorts);
        break;

      case 'E':
      case 'EXIT':
        connect.close(function() {
          process.exit();
        });
        break;

      case 'AT':
        connect.attention();
        break;

      case 'G':
      case 'GET':
        connect.get.apply(connect, command.split(' ').slice(1));
        break;

      case 'S':
      case 'SET':
        connect.set.apply(connect, command.split(' ').slice(1));
        break;

      default:
        prompt();
    }
  });

  prompt();
}