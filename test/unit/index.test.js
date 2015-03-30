require("node-test-helper");
var cwd = process.cwd();
var path = require("path");
var util = require(path.join(cwd, "lib", "util"));
var self = require(cwd);

describe(TEST_NAME, function() {
  describe("using stub", function() {
    it("should send email", function() {
      var sendEmailStub = stub(util, "sendEmail");
      self.execute();
      sendEmailStub.restore();
    });
  });

  describe("using mock", function() {
    it("should send email", function() {
      var emailMock = mock(util);
      emailMock.expects("sendEmail").once();
      self.execute();
      emailMock.verify();
      emailMock.restore();
    });
  });
});
