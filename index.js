"use strict";

var unirest = require('unirest');
var base64 = require('base-64');
var assert = require('assert');
var cheerio = require('cheerio');

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

    var findSmskey = function (html) {
        var $ = cheerio.load(html);
        var key = $('input[name=smskey]').val();
        return key;
    };

    var getSendUrl = function () {
        return [
            'http://', 
            host, 
            port ? ':' + port : '',
            '/default/en_US/sms_info.html?type=sms'
            ].join('');
    };

    var sendRequest = function (params) {
        return new Promise(function(resolve, reject) {
            unirest
                .post(getSendUrl())
                .header(getAuthorizationHeader())
                .header('Content-Type', 'application/x-www-form-urlencoded')
                .send(params)
                .end(function (response) {
                  resolve(response);
                });
        });
    };

    var send = function (params) {

        assert(params.number);
        assert(params.message);
        assert(params.line);
        
        return prepareRequest()
            .then(function (response) {
                //console.log('body',response.body);
                if (response.body) {
                    var smskey = findSmskey(response.body);
                    
                    var message = {
                        smskey: smskey,
                        action: 'SMS',
                        telnum: params.number,
                        smscontent: params.message,
                        line: params.line,
                        send: 'Send'
                    };

                    return sendRequest(message);
                } else {
                    return Promise.reject("no response body");
                }
            })
            .then(function (response) {
                return Promise.resolve(response);
            });
    };

    return {
        findSmskey: findSmskey,
        send: send
    };
};

module.exports = Goip;