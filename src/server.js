const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const httpServer = http.Server();
const expressServer = express();

httpServer.on('request', expressServer);

expressServer.set('etag', false);

expressServer.use(bodyParser.json({
  limit: '1mb'
}));
expressServer.use(bodyParser.urlencoded({
  extended: false
}));

express.server = httpServer;

expressServer.use(require('./router.js'));

module.exports = httpServer;
