
var Goip = require('./index');

var sms = new Goip({host: 'localhost', user: 'admin', password: 'admin'});

sms.send({
    number: '89135292926',
    message: 'Привет',
    line: '8'
  })
  .then(function(response) {
    console.log('response', response.body);
  })