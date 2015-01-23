#protocol-parser
Parse metatags for various protocols: OGP, Twitter, and OSMT supported. 

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

protocolParser.parse(window, 'os')
=> {
  repo: "https://github.com/RichardLitt/open-source-metatags", 
  rcs_type: "git", 
  src: "git@github.com:RichardLitt/open-source-metatags.git", 
  issue: "https://github.com/RichardLitt/open-source-metatags/issues"
}
```

###Method arguments

**protocolParser.parse**(_window_, _prefix_, _divider_)
 * _window_
 * _prefix_: Str. This should be the prefix you want to get, for instance: `os`, `og`, `twitter`.
 * _divider_: Str. defaults to `:`. For some standards, such as `citation`, you should go with `_`. 


## Credits

Written and maintained by [Richard Littauer](https://github.com/RichardLitt).  
