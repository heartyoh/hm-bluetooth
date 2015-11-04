module.exports = {
  "ADC": {
    "desc": "Module Address",
    "get": {
      "params": [{
        "name": "para1",
        "desc": "map to PIO3~PIOB",
        "pattern": "[4-B]"
      }],
      "result": {
        "prefix": "OK+ADC",
        "value": {
          "desc": "PIO voltage",
          "pattern": "0.00"
        },
        "length": 12
      }
    }
  },
  "ADDR": {
    "desc": "Module Address",
    "get": {
      "result": {
        "prefix": "OK+ADDR:",
        "value": {
          "desc": "MAC Address",
          "pattern": "[W]+12"
        },
        "length": 20
      }
    }
  },
  "ADVI": {
    "desc": "Advertising Interval",
    "get": {
      "result": {
        "prefix": "OK+Get:",
        "value": {
          "desc": "Interval",
          "pattern": "[0-F]"
        },
        "length": 8
      }
    },
    "set": {
      "params": [{
        "name": "para1",
        "desc": "Interval",
        "pattern": "[0-F]"
      }]
    }
  },
  "VERR": {
    "desc": "Software Version",
    "get": {
      "result": {
        "prefix": "",
        "value": {
          "desc": "Software Version",
          "pattern": "[W]+12"
        },
        "length": 11
      }
    }
  },
  "VERS": {
    "desc": "Software Version",
    "get": {
      "result": {
        "prefix": "",
        "value": {
          "desc": "Software Version",
          "pattern": "[W]+12"
        },
        "length": 11
      }
    }
  }
}
