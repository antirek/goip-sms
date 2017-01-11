# goip-sms

module for send sms via goip gsm gateway

[![Build Status](https://travis-ci.org/antirek/goip-sms.svg?branch=master)](https://travis-ci.org/antirek/goip-sms)

## install

> npm install goip-sms --save

## usage

`````javascript


var Goip = require('goip-sms');

var sms = new Goip({host: 'goip-ip', user: 'admin', password: 'admin'});

sms.send({
    number: '89135292926',
    message: 'Привет',
    line: '1'
  })
  .then(function(response) {
    console.log('response', response.body);
  })

`````

## test

> npm test

