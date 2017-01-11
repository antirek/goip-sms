
var Goip = require('./index');

var sms = new Goip({host: 'goip-ip', user: 'admin', password: 'admin'});

sms.send({
    number: '89135292926',
    message: 'Привет',
    line: '1'
  })
  .then(function(response) {
    console.log('response', response.body);
  })