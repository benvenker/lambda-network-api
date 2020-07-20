// Create the server!
require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT || 3001;
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const commentsRouter = require('./comments/commentsRouter');
const awardsRouter = require('./awards/awardsRouter');
const commentFlagsRouter = require('./comment_flags/commentFlagsRouter');
const followsRouter = require('./follows/followsRouter');
const jobsRouter = require('./jobs/jobsRouter');
const postAwardsRouter = require('./post_awards/postAwardsRouter');
const postFlagsRouter = require('./post_flags/postFlagsRouter');

const skillsRouter = require('./skills/skillsRouter');
const usersSkillsRouter = require('./users_skills/usersSkillsRouter');
const votesRouter = require('./votes/votesRouter');

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
