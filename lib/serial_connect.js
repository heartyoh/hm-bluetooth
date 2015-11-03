'use strict'

var ByteBuffer = require('bytebuffer');
var SerialPort = require('serialport').SerialPort;
var CommandPattern = require('./command_pattern');

function SerialConnect(dev) {
  this.dev = dev;
  this.buffer = new ByteBuffer(256);
  this.processingCommand = null;
}

function defaultCallbackOpen(err) {
  if(err)
    console.log('open failed : ' + err);
  else
    console.log('opened successfully');
}

function defaultCallbackClose(err) {
  if(err)
    console.log('close failed : ' + err);
  else
    console.log('closed successfully');
}

SerialConnect.devices = function() {
  require('serialport').list(function (err, ports) {
    ports.forEach(function(port) {
      console.log('[' + port.comName + ']');
      console.log(port.pnpId);
      console.log(port.manufacturer);
    });
  });
}

SerialConnect.prototype.open = function(cb) {
  this.connect = new SerialPort(this.dev, {
    baudrate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none'
  }, false); // this is the openImmediately flag [default is true]

  var self = this;

  this.connect.on('data', function(data) {
    if(!self.processingCommand) {
      console.log('No Command');
      return;
    }

    self.buffer.append(data);
    if(self.processingCommand.rlength <= self.buffer.offset) {
      console.log(self.buffer.flip().toBuffer().toString());
      self.buffer.reset();
    }
  });

  this.connect.open(cb || defaultCallbackOpen);
}

SerialConnect.prototype.close = function(cb) {
  this.connect.close(cb || defaultCallbackClose);
}

SerialConnect.prototype.get = function(cmd) {
  this.processingCommand = CommandPattern[cmd];
  if(!this.processingCommand) {
    console.log('Invalid Command : ' + cmd);
    return;
  }

  this.connect.write('AT+' + cmd, function(err, results) {
    if(err) {
      console.log('Command send error : ' + err);
    } else {
      console.log('Sent : ' + results);
    }
  });
}

module.exports = SerialConnect;
