/*
- when making a GET request to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
require('dotenv').config();

const request = require('supertest');

const server = require('../server');
const awards = require('./awards.mock');

describe('server.js', () => {
  describe('index route', () => {
    it('should return OK status code from index route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object from the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
  });

  describe('awards route', () => {
    console.log(
      `process.env.NODE_TLS_REJECT_UNAUTHORIZED: ${process.env.NODE_TLS_REJECT_UNAUTHORIZED}`
    );
    it('should return OK status code from /awards route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/awards');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the /awards route', async () => {
      const expectedBody = awards;

      const response = await request(server).get('/awards');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object from the /awards route', async () => {
      const response = await request(server).get('/awards');

      expect(response.type).toEqual('application/json');
    });
  });
});
