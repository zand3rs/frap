var request = require("request");
var Email = require("./email");

module.exports = {
  sendEmail: function(options, callback) {
    var email = new Email(options);
    email.send(callback);
  },

  isEmpty: function(value) {
    return !value;
  },

  echo: function(body, callback) {
    request.get("http://some.domain.com/echo", function(err, res, _body) {
      if (err) {
        return callback(err);
      }
      callback(null, body);
    });
  }
};
