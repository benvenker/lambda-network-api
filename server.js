require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');

const awardsRouter = require('./routes/awards');
const commentsRouter = require('./routes/comments');
const commentFlagsRouter = require('./routes/commentFlags');
const followsRouter = require('./routes/follows');
const jobsRouter = require('./routes/jobs');
const postsRouter = require('./routes/posts');
const postAwardsRouter = require('./routes/postAwards');
const postFlagsRouter = require('./routes/postFlags');
const skillsRouter = require('./routes/skills');
const usersRouter = require('./routes/users');
const usersSkillsRouter = require('./routes/usersSkills');
const votesRouter = require('./routes/votes');
const { logger } = require('./middleware/logger');

server.use(express.json());
server.use(cors());
server.use(logger);
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'Something went wrong, try again later',
  });
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

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

module.exports = server;
