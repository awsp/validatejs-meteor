var self = this;

Tinytest.add('awsp:validatejs - Testing to see if validate library is loaded. ', function (test) {
  test.equal(typeof self.validate, "function");
});

Tinytest.add('awsp:validatejs - ValidateJS library simple test run. ', function (test) {
  var result = self.validate({password: "bad"}, { password: { length: { minimum: 6 } } });
  test.notEqual(result, undefined);
});