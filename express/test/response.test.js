import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/',(req, res) => {
    res.send(`Hello Response`);
  });

  const response = await request(app).get('/');
  expect(response.text).toBe('Hello Response');
});