module.exports = Email;

function Email(options) {
  this.options = options;
}

//-- instance method
Email.prototype.send = function(callback) {
  //-- send email here...

  //-- execute callback
  callback(null, true);
};

//-- class method
Email.send = function() {
  //-- send email here...

  //-- return status
  return true;
};

