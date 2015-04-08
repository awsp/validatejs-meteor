Meteor package of validate.js
--------------------------------------------
A meteor package wrapper for [validate.js](http://validatejs.org/) library @version 0.6.1!

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
```js
// Example 1
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

// Example 2
var constraints = {
  from: {
    email: true
  }
};
validate({from: "foobar"}, constraints);
// => {"email": ["From doesn't look like a valid email"]}

validate({from: "test@example.com"}, constraints);
// => undefined
```
For more example please visit the offical site.



## Github / Bug Reports
https://github.com/awsp/handsontable-meteor



## License
MIT License