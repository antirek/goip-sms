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
            users: {'root': 'root'}
        }));
        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({extended: true}));

        app.get("/default/en_US/tools.html", function (req, res) {
          var html = '<input type="hidden" name="smskey" value="zero">';
          res.status(200).send(html);
        });

        app.post("/default/en_US/sms_info.html", function (req, res) {
          //console.log(req.body);
          res.status(200).send(req.body);
          assert.equal(req.body.smskey, "zero");
        });

        var port = 8999;

        app.listen(port);

        var goipsms = new Goip({host: 'localhost', port: port, user: 'root', password: 'root'});

        goipsms
            .send({
                number: '89135292926',
                message: 'Привет',
                line: '8'
            })
            .then(function(response) {
                assert.equal(response.status, 200);
                done();
            })
            .catch(function(error) {
                console.log(error);
            });

    });


    it("run find smskey in html code", function(){
        var goipsms = new Goip({host: 'localhost'});

        var html = '<input type="hidden" name="smskey" value="zero">';

        var smskey = goipsms.findSmskey(html);

        assert.equal("zero", smskey);

    })
});