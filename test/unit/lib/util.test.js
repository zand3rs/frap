require("node-test-helper");
var cwd = process.cwd();
var path = require("path");
var request = require("request");
var util = require(path.join(cwd, "lib", "util"));
var Email = require(path.join(cwd, "lib", "email"));

describe(TEST_NAME, function() {
  describe("#sendEmail()", function() {
    describe("stub", function() {
      describe("with error", function() {
        before(function() {
          sendEmailStub = stub(Email.prototype, "send");
          sendEmailStub.yields(new Error("failed"));
        });

        after(function() {
          sendEmailStub.restore();
        });

        it("should return failed error", function(done) {
          util.sendEmail({}, function(err, result) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.equal("failed");
            done();
          });
        });
      });

      describe("without error", function() {
        before(function() {
          sendEmailStub = stub(Email.prototype, "send");
          sendEmailStub.yields(null, true);
        });

        after(function() {
          sendEmailStub.restore();
        });

        it("should be successful", function(done) {
          util.sendEmail({}, function(err, result) {
            expect(err).to.not.exist;
            expect(result).to.be.true;
            done();
          });
        });
      });
    });

    describe("mock", function() {
      describe("with error", function() {
        before(function() {
          emailMock = mock(Email.prototype);
          emailMock.expects("send").once().yields(new Error("failed"));
        });

        after(function() {
          emailMock.verify();
          emailMock.restore();
        });

        it("should return failed error", function(done) {
          util.sendEmail({}, function(err, result) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.equal("failed");
            done();
          });
        });
      });

      describe("without error", function() {
        before(function() {
          emailMock = mock(Email.prototype);
          emailMock.expects("send").once().yields(null, true);
        });

        after(function() {
          emailMock.verify();
          emailMock.restore();
        });

        it("should return failed error", function(done) {
          util.sendEmail({}, function(err, result) {
            expect(err).to.not.exist;
            expect(result).to.be.true;
            done();
          });
        });
      });
    });
  });

  describe("#isEmpty()", function() {
    it("should be ok", function() {
      util.isEmpty(0).should.be.true;
      util.isEmpty("").should.be.true;
      util.isEmpty(null).should.be.true;
      util.isEmpty().should.be.true;

      util.isEmpty(1).should.be.false;
      util.isEmpty("2").should.be.false;
      util.isEmpty({}).should.be.false;
    });
  });

  describe("#echo()", function() {
    describe("stub with error", function() {
      before(function() {
        getRequestStub = stub(request, "get");
        getRequestStub.yields(new Error("failed"));
      });

      after(function() {
        getRequestStub.restore();
      });

      it("should return failed error", function(done) {
        util.echo("hello", function(err, result) {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.equal("failed");
          done();
        });
      });
    });

    describe("stub without error", function() {
      before(function() {
        body = "Hello World!";
        getRequestStub = stub(request, "get");
        getRequestStub.yields(null, {}, body);
      });

      after(function() {
        getRequestStub.restore();
      });

      it("should be successful", function(done) {
        util.echo(body, function(err, result) {
          expect(err).to.not.exist;
          expect(result).to.eql(body);
          done();
        });
      });
    });
  });
});
