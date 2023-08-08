import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/',(req, res) => {
    res.sendFile(__dirname + '/sample.txt');
  });

  const response = await request(app).get('/');
  expect(response.text).toBe('This is sample text');
});