'use strict'

var Help = require('./help');
var SerialPort = require('serialport');
var SerialConnect = require('../lib/serial_connect');

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

function printSerialPorts(err, ports) {
  if(err) {
    console.log('Error during getting serial ports : ' + err);
  } else {
    console.log('Total ' + ports.length + ' Serial Ports are found.');
    ports.forEach(function(port, i) {
      console.log('[ ' + (i+1) + ' ] ' + port.comName);
      console.log('\tpnp ID => ' + port.pnpId);
      console.log('\tmade by => ' + port.manufacturer);
    });
  }

  prompt();
}


function main() {

  var stdin = process.openStdin();

  /* set command complete callback */
  connect.on('complete', function(data) {
    prompt();
  });

  stdin.addListener("data", function(d) {
    var command = d.toString().trim();
    command = command.toUpperCase();

    var first = command.split(' ')[0];

    switch(first) {
      case 'H':
      case 'HELP':
        Help.print();
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