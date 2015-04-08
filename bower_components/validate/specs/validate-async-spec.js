describe("validate.async", function() {
  var error = null
    , success = null
    , Promise = validate.Promise;

  beforeEach(function() {
    success = jasmine.createSpy("success");
    error = jasmine.createSpy("error");

    validate.validators.asyncFail = function() {
      return new validate.Promise(function(resolve, reject) {
        setTimeout(function() {
          reject("failz");
        }, 1);
      });
    };

    validate.validators.asyncSuccess = function() {
      return new validate.Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve();
        }, 1);
      });
    };
  });

  afterEach(function() {
    delete validate.validators.asyncFail;
    delete validate.validators.asyncSuccess;
    delete validate.async.options;
    validate.Promise = Promise;
  });

  it("makes validate return a promise", function() {
    var promise = validate.async({}, {});
    expect(promise).toBeAPromise();
  });

  it("throws an error if no promise is found", function() {
    delete validate.Promise;
    expect(function() {
      validate.async({}, {});
    }).toThrow();
  });

  it("allows you to specify a custom Promise implementation", function() {
    spyOn(validate, "Promise").and.callFake(function(func) {
      return new Promise(func);
    });
    var promise = validate.async({}, {});
    expect(validate.Promise).toHaveBeenCalled();
  });

  it.promise("resolves the promise if all constraints pass", function() {
    var attrs = {foo: "bar"};
    return validate.async(attrs, {}).then(success, error).then(function() {
      expect(error).not.toHaveBeenCalled();
      expect(success).toHaveBeenCalledWith(attrs);
    });
  });

  it.promise("rejects the promise if any constraint fails", function() {
    var c = {name: {presence: true}};
    return validate.async({}, c).then(success, error).then(function() {
      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });
  });


  it.promise("handles validators returning a promise", function() {
    var c = {
      name: {
        asyncFail: true,
        asyncSuccess: true
      }
    };
    return validate.async({}, c).then(success, error).then(function() {
      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledWith({
        name: ["Name failz"]
      });
    });
  });

  it.promise("supports fullMessages: false", function() {
    var c = {name: {presence: true}};
    return validate.async({}, c, {fullMessages: false}).then(success, error).then(function() {
      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledWith({
        name: ["can't be blank"]
      });
    });
  });

  describe("waitForResults", function() {
    var error, success;

    beforeEach(function() {
      error = jasmine.createSpy("error handler");
      success = jasmine.createSpy("success handler");
    });

    it.promise("handles no results", function() {
      return validate.waitForResults([]);
    });

    it.promise("handles results with no promises", function() {
      var results = [{attribute: "foo", error: "bar"}];
      return validate.waitForResults(results).then(function() {
        expect(results).toEqual([{attribute: "foo", error: "bar"}]);
      });
    });

    it.promise("handles results with no promises", function() {
      var results = [{
        attribute: "foo",
        error: new validate.Promise(function(resolve, reject) {
          setTimeout(resolve, 1);
        })
      }, {
        attribute: "bar",
        error: new validate.Promise(function(resolve, reject) {
          setTimeout(reject.bind(this, "My error"), 1);
        })
      }, {
        attribute: "baz",
        error: 4711
      }];

      return validate.waitForResults(results).then(function() {
        expect(results).toEqual([{
          attribute: "foo",
          error: null
        }, {
          attribute: "bar",
          error: "My error"
        }, {
          attribute: "baz",
          error: 4711
        }]);
      });
    });

    it.promise("warns if a promise is rejected without an error", function() {
      spyOn(validate, "warn");

      var results = [{
        attribute: "foo",
        error: new validate.Promise(function(resolve, reject) { reject(); })
      }];

      return validate.waitForResults(results).then(function() {
        expect(results).toEqual([{
          attribute: "foo",
          error: undefined
        }]);
        expect(validate.warn).toHaveBeenCalled();
      });
    });
  });

  it.promise("allows default options", function() {
    validate.async.options = {flatten: true};
    var c = {name: {presence: true}}
      , options = {foo: "bar"};
    return validate.async({}, c, options).then(success, error).then(function() {
      expect(success).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalledWith(["Name can't be blank"]);
      expect(options).toEqual({foo: "bar"});
      expect(validate.async.options).toEqual({flatten: true});
    });
  });
});