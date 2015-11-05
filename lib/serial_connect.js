'use strict'

var ByteBuffer = require('bytebuffer');
var SerialPort = require('serialport').SerialPort;
var CommandPattern = require('./command_pattern');

var COMMAND_TYPE_AT = 0;
var COMMAND_TYPE_GET = 1;
var COMMAND_TYPE_SET = 2;

var WAITING_TIME = 100;

function SerialConnect(dev) {
  this.dev = dev;
  this.buffer = new ByteBuffer(256);
  this.patternType = null;
  this.currentPattern = null;

  this.callbacks = {};
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

SerialConnect.prototype.on = function(event, cb) {
  if(!this.callbacks[event])
    this.callbacks[event] = [];

  var callbacks = this.callbacks[event];
  callbacks.push(cb);
}

SerialConnect.prototype.off = function(event, cb) {
  if(!this.callbacks[event])
    return;

  var callbacks = this.callbacks[event];
  var idx = callbacks.indexOf(cb);
  if(idx >= 0)
    callbacks.pslice(idx, 1);
}

SerialConnect.prototype.fire = function(event) {
  var callbacks = this.callbacks[event];

  if(!callbacks)
    return;

  var args = [].splice.call(arguments, 1);

  callbacks.forEach(function(callback) {
    callback.apply(null, args);
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
    if(self.patternType != COMMAND_TYPE_AT && !self.currentPattern) {

      return;
    }

    self.buffer.append(data);
  });

  this.connect.open(cb || defaultCallbackOpen);
}

SerialConnect.prototype.close = function(cb) {
  this.connect.close(cb || defaultCallbackClose);

  this.callbacks = {};
}

SerialConnect.prototype.attention = function() {
  
  this.patternType = COMMAND_TYPE_AT;

  var self = this;

  this.connect.write('AT', function(err, results) {

    if(err) {

      self.fire('error', 'Command send error : ' + err);
    } else {

      setTimeout(function() {
        complete(self);
      }, WAITING_TIME);
    }
  });
}

SerialConnect.prototype.get = function(cmd) {

  // for(var i = 0;i < arguments.length;i++)
  //   console.log('ARG:' + arguments[i]);

  var pattern = CommandPattern[cmd];
  if(!pattern || !pattern.get) {

    this.fire('error', 'Invalid Command : ' + cmd);
    return;
  }
  
  var get = pattern.get;

  if(get.params && get.params.length > arguments.length - 1) {

    this.fire('error', 'Insufficient parameters');
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

  this.currentPattern = pattern;
  this.patternType = COMMAND_TYPE_GET;

  var self = this;

  this.connect.write(cmd_str, function(err, results) {
    if(err) {

      self.fire('error', 'Command send error : ' + err);
    } else {

      setTimeout(function() {
        complete(self);
      }, WAITING_TIME);
    }
  });
}

SerialConnect.prototype.set = function(cmd) {

  // for(var i = 0;i < arguments.length;i++)
  //   console.log('ARG:' + arguments[i]);

  var pattern = CommandPattern[cmd];
  if(!pattern || !pattern.set) {

    this.fire('error', 'Invalid Command : ' + cmd);
    return;
  }
  
  var set = pattern.set;

  if(set.params && set.params.length > arguments.length - 1) {

    this.fire('error', 'Insufficient parameters');
    return;
  }

  var cmd_str = 'AT+' + cmd;

  if(set.params) {
    var args = arguments;
    set.params.forEach(function(param, i) {
      cmd_str += args[++i];
    });
  }

  // console.log('Written command : ' + cmd_str);

  this.currentPattern = pattern;
  this.patternType = COMMAND_TYPE_SET;

  var self = this;

  this.connect.write(cmd_str, function(err, results) {
    if(err) {

      self.fire('error', 'Command send error : ' + err);
    } else {

      setTimeout(function() {
        complete(self);
      }, WAITING_TIME);
    }
  });
}

function complete(connect) {

  var result = connect.buffer.flip().toBuffer().toString();
  var prefix = '';

  switch(connect.patternType) {
  case COMMAND_TYPE_AT:

    break;

  case COMMAND_TYPE_GET:
    
    prefix = connect.currentPattern.get.result.prefix;

    break;

  case COMMAND_TYPE_SET:
    
    prefix = connect.currentPattern.set.result.prefix;

    break;
  }

  if(prefix && result.indexOf(prefix) != 0) {

    connect.fire('error', "Invalid result (prefix not match) : " + result + " (" + prefix + ")");
  } else {

    connect.fire('complete', result.slice(prefix.length));
  }

  connect.buffer.reset();
}

module.exports = SerialConnect;
