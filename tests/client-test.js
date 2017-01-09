var assert = require('assert');
var http = require('http');

describe("Goip with server", function() {
    var Goip = require('../index');

    it("run test simple http server", function(done){

        var handle = function (req, res) {

            console.log(req.url);
            if (req.url == '/default/en_US/tools.html?type=sms') {
                res.end("good message");    
            } else {
                res.end("bad message");
            }
        };

        var port = 8999;
        var server = http.createServer(handle);

        server.listen(port);

        var goipsms = new Goip({host: 'localhost', port: port});

        goipsms
            .send()
            .then(function(response) {
                console.log(response)
                done();
            });

    });
});