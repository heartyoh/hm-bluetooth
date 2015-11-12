# hm-bluetooth

Implemented based on JNHuaMao Technology Company Bluetooth 4.0 BLE module Datasheet.

# Installation
## Install nodejs
## Install libraries using node package manager
```
$ npm install
```

# Usages
```
$ node app/console
❤               # command prompt
❤ u             # usage - available command list
❤ u name        # usage for the specified command or setting
❤ at            # attention command
❤ name?         # query property
❤ name TEST     # set property
❤ start         # commands
```
```
❤ renew         # renew command
RENEW
❤ reset         # reset command
RESET
❤ at            # attention command
OK
❤ marj 0x1234   # set major version to 0x1234
0x1234
❤ mino 0xFA01   # set minor version to 0xFA01
0xFA01
❤ advi 5        # set advertise interval to 5 sec.
5
❤ name HOTCHOCO # set name to HOTCHOCO
HOTCHOCO
❤ name?         # query name
HOTCHOCO
❤ adty 3        # set non-connectable mode
3
❤ ibea 1
1
❤ delo 2
2
❤ pwrm 0
0
❤ reset
RESET
```
