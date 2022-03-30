const PORT = 3000;
const express = require("express");
const server = express();
const morgan = require("morgan");
const { client } = require("./db");

require("dotenv").config();
client.connect();
server.use(morgan("dev"));
server.use(express.json());

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.listen(PORT, () => {
  console.log("the server is running", PORT);
});


