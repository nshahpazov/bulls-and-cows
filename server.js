var WebSocketServer = require('ws').Server;
var BullsAndCows = require('./bulls-and-cows');
var _ = require('lodash');
var WSController = require('./ws-controller');
var control = require('./control');

var wss = new WebSocketServer({
  port: 3000,
  host: '0.0.0.0'
});

console.log('Server Started on port 3000');

wss.on('connection', function connection(ws) {
  'use strict';
  var controller = new WSController(wss, ws);
  controller.initialize(control(wss, ws));
  console.log('someone connected to the server');
});
