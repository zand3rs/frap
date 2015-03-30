require("node-test-helper");
var cwd = process.cwd();
var path = require("path");
var Email = require(path.join(cwd, "lib", "email"));

describe(TEST_NAME, function() {
  describe("#send()", function() {
    it("should be successful", function(done) {
      var email = new Email();
      email.send(function(err, result) {
        expect(err).to.not.exist;
        expect(result).to.be.true;
        done();
      });
    });
  });

  describe(".send()", function() {
    it("should be successful", function() {
      var status = Email.send();
      expect(status).to.be.true;
    });
  });
});
