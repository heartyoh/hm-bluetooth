'use strict'

var CommandPattern = require('../lib/command_pattern');

function print(command) {

  if(!command) {

    printTopMenu();
  } else {
    let upperCase = command.toUpperCase();
    printCommandInfo(upperCase);
    printGetParamsInfo(upperCase);
    printSetParamsInfo(upperCase);
  }
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

function printTopMenu() {

  console.log("Following commands are available.");

  console.log("==================================");
  console.log("[h]elp : print help.");
  console.log("e[x]it : exit program.");
  console.log("[p]orts : print available serial port list.");

  console.log("");
  console.log("AT : Attention!");

  for(var id in CommandPattern) {
    let command = CommandPattern[id];
    if(command.command) {
      console.log(id + ' : ' + command.desc);
    }
  }

  console.log("");
  console.log("Get commands");

  for(var id in CommandPattern) {
    let command = CommandPattern[id];
    if(command.get) {
      console.log('\t' + id + ' : Query ' + command.desc);
    }
  }

  console.log("");
  console.log("Set commands");
  for(var id in CommandPattern) {
    let command = CommandPattern[id];
    if(command.set) {
      console.log('\t' + id + ' : Set ' + command.desc);
    }
  }

  console.log("==================================");
}

function printCommandInfo(cmd) {

  var pattern = CommandPattern[cmd];
  var command = pattern && pattern.command;

  if(!command) {
    return;
  }

  console.log('[ ' + cmd + ' ] ' + pattern.desc);
}

function printGetParamsInfo(cmd) {

  var pattern = CommandPattern[cmd];
  var command = pattern && pattern.get;

  if(!command) {
    return;
  }

  console.log('[ ' + cmd + '? ] Get ' + pattern.desc);

  if(!command.params) {
    console.log('No Parameters.');
    return;
  }

  command.params.forEach(function(param, i) {
    console.log('- Parameter #' + (i + 1));

    if(param.desc instanceof Array) {
      console.log(param.name + ' ' + param.pattern + ' =>');
      console.log('\t' + param.desc.join('\n\t'));
    } else {
      console.log(param.name + ' ' + param.pattern + ' => ' + param.desc);
    }
  });
}

function printSetParamsInfo(cmd) {

  var pattern = CommandPattern[cmd];
  var command = pattern && pattern.set;

  if(!command) {
    return;
  }

  console.log('[ ' + cmd + ' ] Set ' + pattern.desc);

  if(!command.params) {
    console.log('Set Command Has no Parameters.');
    return;
  }

  command.params.forEach(function(param, i) {
    console.log('- Parameter #' + (i + 1));

    if(param.desc instanceof Array) {
      console.log(param.name + ' ' + param.pattern + ' =>');
      console.log('\t' + param.desc.join('\n\t'));
    } else {
      console.log(param.name + ' ' + param.pattern + ' => ' + param.desc);
    }
  });
}

module.exports = {
  print : print
};
