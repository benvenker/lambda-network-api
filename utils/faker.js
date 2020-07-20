// WARNING: only run this file if the db is empty or you want to add more data. IT WILL WRITE
// TO THE DATABASE
// require('dotenv').config();
const faker = require('faker');
const db = require('../data/dbConfig.js');

// If you need more data in a particular entity, you can comment
// out the respective function and it will update the data.

// TODO: Make each function take a number of records as an argument

// populateAwards(); // Has array in the function providing data
populateUsers(10);
// populatePosts(100);
// populateComments(100);
// populateVotes(100);

function populateAwards() {
  const awards = ['Hero', 'Gratitude', 'Diamond', 'Charity'];

  return awards.map(async (award, i) => {
    try {
      return db('awards').insert({ award_name: award, id: i });
    } catch (err) {
      return console.log(err);
    }
  });
}

function populateUsers(rows) {
  const permissions = ['user', 'admin', 'superuser'];

  for (counter = 1; counter <= rows; counter++) {
    const permission =
      permissions[Math.floor(Math.random() * permissions.length)];

    setTimeout(async () => {
      const user = {
        id: faker.random.uuid(),
        permission_type: 'user',
        created_date: faker.date.past(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        bio: faker.lorem.paragraph(),
        personal_website: faker.internet.url(),
        company: faker.company.companyName(),
        github_username: faker.internet.userName(),
        location: faker.address.city(),
        is_banned: faker.random.boolean(),
        permanently_banned: faker.random.boolean(),
        job_id: faker.random.uuid(),
      };

      return db('users')
        .insert(user)
        .catch(err => console.log(err));
    }, 1000);
  }
}

async function populatePosts(rows) {
  const users = await db.select('id').from('users');

  for (i = 0; i <= rows; i++) {
    setTimeout(async () => {
      const userId = users[Math.floor(Math.random() * users.length) + 1].id;

      const post = {
        id: faker.random.uuid(),
        body: faker.lorem.paragraph(),
        created_date: faker.date.past(),
        title: faker.lorem.sentence(),
        link: faker.internet.url(),
        user_id: userId,
      };
      return db('posts')
        .insert(post)
        .catch(err => err);
    }, 1000);
  }
}

async function populateComments(rows) {
  const posts = await db.select('id').from('posts');
  const users = await db.select('id').from('users');

  for (i = 0; i <= rows; i++) {
    setTimeout(async () => {
      // Get a random post from the posts array
      const post = posts[Math.floor(Math.random() * posts.length) + 1];
      const user = users[Math.floor(Math.random() * users.length) + 1];

      return db('comments')
        .insert({
          id: faker.random.uuid(),
          body: faker.lorem.paragraph(),
          created_date: faker.date.past(),
          post_id: post.id,
          user_id: user.id,
        })
        .catch(err => console.log(err));
    });
  }
}

async function populateVotes(rows) {
  const posts = await db.select('id').from('posts');
  const users = await db.select('id').from('users');

  for (i = 0; i < rows; i++) {
    setTimeout(async () => {
      const post = posts[Math.floor(Math.random() * posts.length) + 1];
      const user = users[Math.floor(Math.random() * users.length) + 1];
      const vote = {
        id: faker.random.uuid(),
        upvote: faker.random.boolean(),
        post_id: post.id,
        user_id: user.id,
        created_date: faker.date.past(),
      };
      return db('votes')
        .insert(vote)
        .catch(err => console.log(err));
    }, 1000);
  }
}
