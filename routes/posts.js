const express = require('express');
const posts = require('../models/posts.js');
const UUID = require('uuid-1345');

const { validateUserId } = require('../middleware/usersMiddleware');
const { validatePostId } = require('../middleware/postsMiddleware');
const { getVotesByPostId } = require('../models/votes');
const { orWhereNotExists } = require('../data/dbConfig.js');
const { post } = require('../server.js');

const router = express.Router();

router.get('/', (req, res) => {
  return posts
    .get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ msg: err }));
});

router.get('/users/:id', validateUserId(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const usersPosts = await posts.getPostsByUserId(id);
    const newUsersPosts = [];

    await getVotes(usersPosts);
    console.log(newUsersPosts);
    res.status(200).json(newUsersPosts);

    async function getVotes(posts) {
      for (i = 0; i < posts.length; i++) {
        const post = posts[i];
        // console.log(post);
        let votes = await getVotesByPostId(posts[i].id);
        votes = votes.votes;

        newUsersPosts.push({ ...posts[i], votes });
      }
      return newUsersPosts;
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validatePostId(), (req, res) => {
  return res.status(200).json(req.post);
});

// Create a new post
router.post('/', async (req, res) => {
  if (req.body) {
    const post = {
      id: UUID.v4(),
      created_date: new Date(),
      ...req.body,
    };
    try {
      const newPost = await posts.insert(post);
      return res.status(200).json({ id: newPost[0] });
    } catch (err) {
      return res.status(500).json({ message: `Error creating post: ${err}` });
    }
  } else {
    res.status(400).json({ message: 'No post body was provided' });
  }
});

// Get the list of posts from the users a user is following
router.get('/users/:id/following', validateUserId(), async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      res.status(400).json({ message: 'No user provided' });
    } else {
      const followedPosts = await posts.getPostsByUsersAUserFollows(id);
      const newFollowedPosts = [];
      await getVotes(followedPosts);
      res.status(200).json(newFollowedPosts);

      async function getVotes(posts) {
        for (i = 0; i < posts.length; i++) {
          const post = posts[i];
          // console.log(post);
          let votes = await getVotesByPostId(posts[i].id);
          votes = votes.votes;

          newFollowedPosts.push({ ...posts[i], votes });
        }
        return newFollowedPosts;
      }
    }
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err}` });
  }
});

module.exports = router;
