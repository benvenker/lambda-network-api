// Create the server!
require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 3001;

const awardsRouter = require('./routes/awardsRouter');
const commentsRouter = require('./routes/commentsRouter');
const commentFlagsRouter = require('./routes/commentFlagsRouter');
const followsRouter = require('./routes/followsRouter');
const jobsRouter = require('./routes/jobsRouter');
const postsRouter = require('./routes/postsRouter');
const postAwardsRouter = require('./routes/postAwardsRouter');
const postFlagsRouter = require('./routes/postFlagsRouter');
const skillsRouter = require('./routes/skillsRouter');
const usersRouter = require('./routes/usersRouter');
const usersSkillsRouter = require('./routes/usersSkillsRouter');
const votesRouter = require('./routes/votesRouter');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Welcome the Lambda Netork API!</h1>');
});

server.use('/awards', awardsRouter);
server.use('/comments', commentsRouter);
server.use('/comment-flags', commentFlagsRouter);
server.use('/follows', followsRouter);
server.use('/jobs', jobsRouter);
server.use('/posts', postsRouter);
server.use('/post-awards', postAwardsRouter);
server.use('/post-flags', postFlagsRouter);
server.use('/skills', skillsRouter);
server.use('/users', usersRouter);
server.use('/users-skills', usersSkillsRouter);
server.use('/votes', votesRouter);

module.exports = { server, port };
