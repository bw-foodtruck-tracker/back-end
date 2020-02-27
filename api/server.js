const express = require('express');

const foodTruckRouter = require('./api-router.js');

const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', foodTruckRouter);

module.exports = server