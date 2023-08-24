import express from "express";
import request from "supertest";

const app = express();

app.get('/', async (req,res) => {
  res.send('Hello World');
});

test('test hello world', async() => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello World');
});