var assert = require('assert');
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('express-basic-auth');

describe("Goip with server", function() {
    var Goip = require('../index');

    it("run test simple http server", function(done){

        var app = express();
        app.use(basicAuth({
            users: { 'admin': 'password' }
        }));
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({extended: true}));

        app.get("/default/en_US/tools.html", function (req, res) {
          res.status(200).send(req.body);
        });

        app.post("/default/en_US/sms_info.html", function (req, res) {
          res.status(200).send(req.body);
        });

        var port = 8999;
        //var server = http.createServer(handle);

        app.listen(port);

        var goipsms = new Goip({host: 'localhost', port: port});

        goipsms
            .send({
                number: '89135292926',
                message: 'Привет',
                line: '8'
            })
            .then(function(response) {
                console.log(response)
                done();
            });

    });
});