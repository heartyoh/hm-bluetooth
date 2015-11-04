'use strict'

var CommandPattern = require('../lib/command_pattern');

function print() {
  console.log("Following commands are available.");

  console.log("==================================");
  console.log("[h]elp : print help.");
  console.log("e[x]it : exit program.");
  console.log("[p]orts : print available serial port list.");
  
  console.log("");
  console.log("at : test command.");

  console.log("");
  console.log("[g]et commands");

  for(var id in CommandPattern) {
    let command = CommandPattern[id];
    if(command.get) {
      console.log('\t' + id + ' : Query ' + command.desc);
    }
  }

  console.log("");
  console.log("[s]et commands");
  for(var id in CommandPattern) {
    let command = CommandPattern[id];
    if(command.set) {
      console.log('\t' + id + ' : Set ' + command.desc);
    }
  }

  console.log("==================================");
}

module.exports = {
  print : print
};