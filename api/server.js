const express = require('express');

const foodTruckRouter = require('./api-router.js');

const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', foodTruckRouter);

server.get('/', (req,res) => {
    
    res.send(`<h2>Server ON</h2>`)
});

module.exports = server