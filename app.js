
var Goip = require('./index');

var goipsms = new Goip({host: 'localhost', port: 8080});

goipsms.send();