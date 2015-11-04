'use strict'

var ByteBuffer = require('bytebuffer');
var SerialPort = require('serialport').SerialPort;
var CommandPattern = require('./command_pattern');

var COMMAND_TYPE_GET = 1;
var COMMAND_TYPE_SET = 2;

function SerialConnect(dev) {
  this.dev = dev;
  this.buffer = new ByteBuffer(256);
  this.patternType = null;
  this.currentPattern = null;
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
    if(!self.currentPattern) {
      console.log('No Command');
      return;
    }

    self.buffer.append(data);

    if(self.patternType == COMMAND_TYPE_GET) {
      if(self.currentPattern.get.result.length <= self.buffer.offset) {
        let result = self.buffer.flip().toBuffer().toString();
        let prefix = self.currentPattern.get.result.prefix;

        if(prefix && result.indexOf(prefix) != 0) {
          console.log("Invalid result (prefix not match) : " + result + " (" + prefix + ")");
        } else {
          console.log(result.slice(self.currentPattern.get.result.prefix.length));
        }
        self.buffer.reset();
      }
    } else {
      // for COMMAND_TYPE_SET
    }

  });

  this.connect.open(cb || defaultCallbackOpen);
}

SerialConnect.prototype.close = function(cb) {
  this.connect.close(cb || defaultCallbackClose);
}

SerialConnect.printGetParamsInfo = function(get) {
  get.params.forEach(function(param) {
    console.log('[' + param.name + '] ' + param.desc + ' /' + param.pattern + '/');
  });
}

SerialConnect.prototype.get = function(cmd) {

  // for(var i = 0;i < arguments.length;i++)
  //   console.log('ARG:' + arguments[i]);

  var pattern = CommandPattern[cmd];
  if(!pattern || !pattern.get) {
    console.log('Invalid Command : ' + cmd);
    return;
  }
  
  var get = pattern.get;

  if(get.params && get.params.length > arguments.length - 1) {
    console.log('Insufficient parameters');
    SerialConnect.printGetParamsInfo(get);
    return;
  }

  var cmd_str = 'AT+' + cmd;

  if(get.params) {
    var args = arguments;
    get.params.forEach(function(param, i) {
      cmd_str += args[++i];
    });
  }
  cmd_str += '?';

  // console.log('Written command : ' + cmd_str);

  this.currentPattern = pattern;
  this.patternType = COMMAND_TYPE_GET;

  this.connect.write(cmd_str, function(err, results) {
    if(err) {
      console.log('Command send error : ' + err);
    } else {
      // console.log('Sent : ' + results);
    }
  });
}

module.exports = SerialConnect;
