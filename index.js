const PORT = 3000;
const express = require('express');
const server = express();

const {client} = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

server.listen(PORT, ()=>{
    console.log('the server is running', PORT)
});

