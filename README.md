#protocol-parser
Parse <head> for various protocols: OGP, Twitter, and OSMT supported.

## Installation
Via [npm](http://search.npmjs.org/#/ogp):

    $ npm install protocol-parser

As a submodule of your project

    $ git submodule add http://github.com/RichardLitt/protocol-parser.git protocol-parser
    $ git submodule update --init


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

_More to be filled out._

## Credits

Written and maintained by [Richard Littauer](https://github.com/RichardLitt).
_Initially based on [node-ogp](https://github.com/SpeCT/node-ogp)._
