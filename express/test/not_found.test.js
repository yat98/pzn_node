import express from 'express';
import request from 'supertest';

const app = express();

app.get('/',(req, res) => {
  res.send(`Hello Response`);
});

app.use((req,res,next) => {
  res.status(404).send('404 Not Found Euy');
});

test("test response not found", async() => {
  const response = await request(app).get('/product');
  expect(response.text).toBe('404 Not Found Euy');
});