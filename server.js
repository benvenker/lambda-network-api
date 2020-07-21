// Create the server!
require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 3001;

const awardsRouter = require('./routes/awards');
const commentsRouter = require('./routes/comments');
const commentFlagsRouter = require('./routes/commentFlags');
const followsRouter = require('./routes/follows');
const jobsRouter = require('./routes/jobs');
const postsRouter = require('./routes/post');
const postAwardsRouter = require('./routes/postAwards');
const postFlagsRouter = require('./routes/postFlags');
const skillsRouter = require('./routes/skills');
const usersRouter = require('./routes/users');
const usersSkillsRouter = require('./routes/usersSkills');
const votesRouter = require('./routes/votes');

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
