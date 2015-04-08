Meteor package of validate.js
--------------------------------------------
A meteor package wrapper for [validate.js](http://validatejs.org/) library! 

Current Package Version: 0.3.0


## Installation

- AtmosphereJS
```
meteor add awsp:validatejs
```

- Manual Installation
    - Clone this repository, add to the directory `packages` (Create one at your app root if you haven't done so. )
    - Run `meteor add awsp:validatejs`



## Usage
###Example
```js
var constraints = {
  username: {
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  }
};

validate({username: "Nicklas!"}, constraints);
// => {"username": ["Username can only contain a-z and 0-9"]}
```
For more example please visit the offical site.



## Github / Bug Reports
https://github.com/awsp/handsontable-meteor



## License
MIT License