var cwd = process.cwd();
var path = require("path");
var util = require(path.join(cwd, "lib", "util"));

module.exports = {
  execute: function() {
    util.sendEmail({}, function(err, result) {
      console.log(err, result);
    });
  }
};
