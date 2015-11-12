'use strict'

var Connect = require('../index');

var Help = require('./help');
var SerialPort = require('serialport');
var CommandPattern = require('../lib/command_pattern');

var connect = new Connect('/dev/tty.usbserial');
// var connect = new Connect('/dev/ttyUSB0');

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

  stdin.addListener("data", function(d) {
    var command = d.toString().trim();

    var first = command.split(' ')[0].toUpperCase();

    switch(first) {
      case 'U':
      case 'USAGE':
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

      case 'WAKE':
        connect.wake();
        break;

      default:
        if(first.endsWith('?')) {
          connect.get.apply(connect, command.split(' '));
        } else {
          let pattern = CommandPattern[first];
          if(!pattern) {
            console.log('Invalid Command : ' + command);
            prompt();
          } else if(pattern.command) {
            connect.command.apply(connect, command.split(' '));
          } else if(pattern.set) {
            connect.set.apply(connect, command.split(' '));
          } else {
            console.log('Invalid Command : ' + command);
            prompt();
          }
        }
    }
  });

  /* set command complete callback */
  connect.on('complete', function(data) {
    console.log(data);
    prompt();
  });

  connect.on('error', function(error) {
    console.error(error);
    prompt();
  });

  prompt();
}
