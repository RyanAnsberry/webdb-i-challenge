const express = require('express');

const AccountRouter = require('./account-router.js');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

module.exports = server;