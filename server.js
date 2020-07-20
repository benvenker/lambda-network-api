// Create the server!
require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 3001;
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');
const commentsRouter = require('./routes/commentsRouter');
const awardsRouter = require('./routes/awardsRouter');
const commentFlagsRouter = require('./routes/commentFlagsRouter');
const followsRouter = require('./routes/followsRouter');
const jobsRouter = require('./routes/jobsRouter');
const postAwardsRouter = require('./routes/postAwardsRouter');
const postFlagsRouter = require('./routes/postFlagsRouter');

const skillsRouter = require('./routes/skillsRouter');
const usersSkillsRouter = require('./routes/usersSkillsRouter');
const votesRouter = require('./routes/votesRouter');

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Welcome the Lambda Netork API!</h1>');
});

server.use('/users', usersRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);
server.use('/awards', awardsRouter);
server.use('/comment-flags', commentFlagsRouter);
server.use('/follows', followsRouter);
server.use('/jobs', jobsRouter);
server.use('/post-awards', postAwardsRouter);
server.use('/post-flags', postFlagsRouter);
server.use('/skills', skillsRouter);
server.use('/users-skills', usersSkillsRouter);
server.use('/votes', votesRouter);

module.exports = { server, port };
