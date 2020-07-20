// Create the server!
require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 3001;
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const commentsRouter = require('./comments/commentsRouter');
const awardsRouter = require('./awards/awardsRouter');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Welcome the Lambda Netork API!</h1>');
});

server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);
server.use('/awards', awardsRouter);
module.exports = { server, port };
