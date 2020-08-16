// WARNING: only run this file if the db is empty or you want to add more data. IT WILL WRITE
// TO THE DATABASE
// require('dotenv').config();
const faker = require('faker');
const db = require('./data/dbConfig');

// If you need more data in a particular entity, you can comment
// out the respective function and it will update the data.

// TODO: Make each function take a number of records as an argument

// populateAwards(); // Has array in the function providing data
// populateUsers(10);
// populatePosts(100);
// populateComments(100);
// populateVotes(100);
// populateSkills();
// populateFollows(100);
// populateSkills();
// populateJobs();

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

async function populateFollows(rows) {
  const users = await db.select('id').from('users');
  for (i = 0; i <= rows; i++) {
    setTimeout(async () => {
      const follower = users[Math.floor(Math.random() * users.length) + 1].id;
      const followed = users[Math.floor(Math.random() * users.length) + 1].id;

      const follow = {
        follower_id: follower,
        followed_id: followed,
        following_date: faker.date.past(),
      };

      // console.log(follow);
      return db('follows')
        .insert(follow)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }, 1000);
  }
}

async function populateSkills(rows) {
  const skills = [
    { id: faker.random.uuid(), name: 'Angular' },
    { id: faker.random.uuid(), name: 'jQuery' },
    { id: faker.random.uuid(), name: 'Polymer' },
    { id: faker.random.uuid(), name: 'React' },
    { id: faker.random.uuid(), name: 'Vue.js' },
    { id: faker.random.uuid(), name: 'Typescript' },
    { id: faker.random.uuid(), name: 'Node' },
    { id: faker.random.uuid(), name: 'Python' },
    { id: faker.random.uuid(), name: 'Java' },
    { id: faker.random.uuid(), name: 'Gatsby' },
    { id: faker.random.uuid(), name: 'GraphQL' },
    { id: faker.random.uuid(), name: 'SQL' },
    { id: faker.random.uuid(), name: 'MondoDB' },
    { id: faker.random.uuid(), name: 'PostgreSQL' },
    { id: faker.random.uuid(), name: 'HTML' },
    { id: faker.random.uuid(), name: 'CSS' },
    { id: faker.random.uuid(), name: 'Javascript' },
    { id: faker.random.uuid(), name: 'React Native' },
    { id: faker.random.uuid(), name: 'Flutter' },
    { id: faker.random.uuid(), name: 'Swift' },
  ];

  skills.map(async skill => {
    try {
      const res = await db('skills').insert(skill);
      return console.log(res);
    } catch (err) {
      return console.log(err);
    }
  });
}

async function populateJobs() {
  const jobs = [
    { name: 'Fullstack Developer', id: faker.random.uuid() },
    { name: 'Frontend Developer', id: faker.random.uuid() },
    { name: 'Backend Developer', id: faker.random.uuid() },
    { name: 'Data Scientist', id: faker.random.uuid() },
    { name: 'UX Designer', id: faker.random.uuid() },
    { name: 'Junior Developer', id: faker.random.uuid() },
    { name: 'Senior Developer', id: faker.random.uuid() },
  ];

  jobs.map(async job => {
    try {
      const res = await db('jobs').insert(job);
      return res;
    } catch (err) {
      return console.log(err);
    }
  });
}

async function populateUsersJobs() {
  const users = await db.select('id').from('users');
  const jobs = await db.select('id').from('jobs');

  users.map(async user => {
    const jobId = jobs[Math.floor(Math.random() * jobs.length)].id;
    return db('users').where({ id: user.id }).update({ job_id: jobId });
  });
}

populateUsersJobs();
