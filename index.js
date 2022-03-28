const PORT = 3000;
const express = require('express');
const server = express();

server.listen(PORT, ()=>{
    console.log('the server is running', PORT)
});