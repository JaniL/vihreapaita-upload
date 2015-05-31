var express = require('express');
var http = require('./http.js');
var irc = require('irc');

var app = express();

var Http = new http(app);


var client = new irc.Client('open.ircnet.net', 'vihreabotti', {
  channels: ['#vihreatesti'],
  debug: true
});

Http.addListener(function(msg) {
  client.say('#vihreatesti', msg);
});
