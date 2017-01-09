"use strict";

var unirest = require('unirest');
var base64 = require('base-64');
var assert = require('minimalistic-assert');

var Goip = function (opts) {

    assert(opts.host);

    var host = opts.host;
    var port = opts.port || null;
    var user = opts.user || 'admin';
    var password = opts.password || 'password';

    var getAuthorizationHeader = function () {
        return {
            'Authorization': 'Basic ' + base64.encode(user + ":" + password)
        };
    };

    var getPrepareUrl = function () {
        return [
            'http://', 
            host, 
            port ? ':' + port : '',
            '/default/en_US/tools.html?type=sms'
            ].join('');
    };

    var prepareRequest = function () {
        return new Promise(function(resolve, reject) {
            unirest
                .get(getPrepareUrl())
                .header(getAuthorizationHeader())
                .end(function (response) {
                  resolve(response);
                });
        });
    };

    var sendRequest = function (number, message, line) {

    };

    var send = function () {
        
        return prepareRequest()
            .then(function (response) {
                //console.log('response', response);
                return Promise.resolve(response);
//                return sendRequest(number, message, line);
            });
    }

    return {
        send: send
    };
};

module.exports = Goip;