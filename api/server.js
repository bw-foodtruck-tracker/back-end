// const express = require('express');
const express = require('express');

const helmet = require('helmet')

const cors = require('cors');
// const router = require('express').Router();

const dinerAuthRouter = require('../auth/diner-auth-router.js');
const operatorAuthRouter = require('../auth/operator-auth-router.js');
const loginAuthRouter = require('../auth/login-router.js');

const server = express();

server.use('api/auth/operator', operatorAuthRouter);
server.use('api/auth/diner', dinerAuthRouter);
server.use('api/auth/login', loginAuthRouter);

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req,res) => {
    res.json({api: 'working'})
});

// const foodTruckRouter = require('./api-router.js');

// const configureMiddleware = require('./configure-middleware.js');



// configureMiddleware(server);

// server.use('/api', foodTruckRouter);

module.exports = server