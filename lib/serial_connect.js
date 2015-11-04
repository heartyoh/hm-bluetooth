'use strict'

var ByteBuffer = require('bytebuffer');
var SerialPort = require('serialport').SerialPort;
var CommandPattern = require('./command_pattern');

var COMMAND_TYPE_AT = 0;
var COMMAND_TYPE_GET = 1;
var COMMAND_TYPE_SET = 2;

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

SerialConnect.printGetParamsInfo = function(get) {
  get.params.forEach(function(param) {
    if(param.desc instanceof Array) {
      console.log(param.name + ' ' + param.pattern + ' =>');
      console.log('\t' + param.desc.join('\n\t'));
    } else {
      console.log(param.name + ' ' + param.pattern + ' => ' + param.desc);
    }
  });
}

SerialConnect.printSetParamsInfo = function(set) {
  set.params.forEach(function(param) {
    if(param.desc instanceof Array) {
      console.log(param.name + ' ' + param.pattern + ' =>');
      console.log('\t' + param.desc.join('\n\t'));
    } else {
      console.log(param.name + ' ' + param.pattern + ' => ' + param.desc);
    }
  });
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

  var args = [].splice.call(arguments,0);

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
      console.log('No Command');
      return;
    }

    self.buffer.append(data);

    switch(self.patternType) {
      case COMMAND_TYPE_AT:
        
        if(2 <= self.buffer.offset) {
          
          let result = self.buffer.flip().toBuffer().toString();
          let prefix = 'OK';

          if(prefix && result.indexOf(prefix) != 0) {
            console.log("Invalid result (prefix not match) : " + result + " (" + prefix + ")");
          } else {
            console.log(result);
          }
          self.buffer.reset();

          self.fire('complete');
        }

        break;

      case COMMAND_TYPE_GET:
        
        if(self.currentPattern.get.result.length <= self.buffer.offset) {
          
          let result = self.buffer.flip().toBuffer().toString();
          let prefix = self.currentPattern.get.result.prefix;

          if(prefix && result.indexOf(prefix) != 0) {
            console.log("Invalid result (prefix not match) : " + result + " (" + prefix + ")");
          } else {
            console.log(result.slice(self.currentPattern.get.result.prefix.length));
          }
          self.buffer.reset();

          self.fire('complete');
        }
        break;

      case COMMAND_TYPE_SET:
        
        if(self.currentPattern.set.result.length <= self.buffer.offset) {
        
          let result = self.buffer.flip().toBuffer().toString();
          let prefix = self.currentPattern.set.result.prefix;

          if(prefix && result.indexOf(prefix) != 0) {
            console.log("Invalid result (prefix not match) : " + result + " (" + prefix + ")");
          } else {
            console.log(result.slice(self.currentPattern.set.result.prefix.length));
          }
          self.buffer.reset();

          self.fire('complete');
        }
        break;
    }

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
      console.log('Command send error : ' + err);
      self.fire('complete');
    } else {
      // console.log('Sent : ' + results);
    }
  });
}

SerialConnect.prototype.get = function(cmd) {

  // for(var i = 0;i < arguments.length;i++)
  //   console.log('ARG:' + arguments[i]);

  var pattern = CommandPattern[cmd];
  if(!pattern || !pattern.get) {
    console.log('Invalid Command : ' + cmd);

    this.fire('complete');

    return;
  }
  
  var get = pattern.get;

  if(get.params && get.params.length > arguments.length - 1) {
    console.log('Insufficient parameters');
    SerialConnect.printGetParamsInfo(get);

    this.fire('complete');
    
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

  var self = this;

  this.connect.write(cmd_str, function(err, results) {
    if(err) {
      console.log('Command send error : ' + err);
      self.fire('complete');
    } else {
      // console.log('Sent : ' + results);
    }
  });
}

SerialConnect.prototype.set = function(cmd) {

  // for(var i = 0;i < arguments.length;i++)
  //   console.log('ARG:' + arguments[i]);

  var pattern = CommandPattern[cmd];
  if(!pattern || !pattern.set) {
    console.log('Invalid Command : ' + cmd);

    this.fire('complete');
    
    return;
  }
  
  var set = pattern.set;

  if(set.params && set.params.length > arguments.length - 1) {
    console.log('Insufficient parameters');
    SerialConnect.printSetParamsInfo(set);

    this.fire('complete');

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
      console.log('Command send error : ' + err);
      self.fire('complete');
    } else {
      // console.log('Sent : ' + results);
    }
  });
}

module.exports = SerialConnect;
