import express from 'express';
import request from 'supertest';

test("test request header", async() => {
  const app = express();

  app.get('/',(req, res) => {
    const type = req.get('accept');
    res.send(`Hello ${type}`);
  });

  const response = await request(app).get('/')
    .set('Accept','text/plain');
  expect(response.text).toBe('Hello text/plain');
});