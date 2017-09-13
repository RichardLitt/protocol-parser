#protocol-parser

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/protocol-parser.svg)](https://greenkeeper.io/)
Parse metatags for various protocols: OGP, Twitter, citation, DC and OSMT supported. 

[![NPM](https://nodei.co/npm/protocol-parser.png)](https://nodei.co/npm/protocol-parser/)

## Installation

```bash
$ npm install protocol-parser
```

## Usage

```js
var protocolParser = require('protocol-parser')

protocolParser.isProfileCompliant(window, 'os', 'https://github.com/RichardLitt/open-source-metatags/')
=> true

protocolParser.parse(window, ['os', 'twitter'])
=> {
  'os': {
    repo: "https://github.com/RichardLitt/open-source-metatags", 
    rcs_type: "git", 
    src: "git@github.com:RichardLitt/open-source-metatags.git", 
    issue: "https://github.com/RichardLitt/open-source-metatags/issues"
  },
  'twitter': {...}
}

protocolParser.standardProtocols()
=> {
  'citation': {...},
  'dc': {...},
  'og': {...},
  'os': {...},
  'twitter': {...}
}
```


## Credits

Written and maintained by [Richard Littauer](https://github.com/RichardLitt).  
