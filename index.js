'use strict'

var ByteBuffer = require('bytebuffer');
var SP = require("serialport");

// SP.list(function (err, ports) {
//   ports.forEach(function(port) {
//     console.log('[' + port.comName + ']');
//     console.log(port.pnpId);
//     console.log(port.manufacturer);
//   });
// });

var buffer = new ByteBuffer(256);
var SerialPort = SP.SerialPort;

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none'
}, false); // this is the openImmediately flag [default is true]

serialPort.on("data", function(data) {
  buffer.append(data);
});

serialPort.open(function(err) {
  if(err)
    console.log("open " + err);
  else
    console.log("open");

  serialPort.write("AT+VERR?", function(err, results) {
    if(err) {
      console.log('err ' + err);
      return;
    }

    setTimeout(function() {
      console.log("" + buffer.flip().toBuffer());
    }, 1000);
  })
});

