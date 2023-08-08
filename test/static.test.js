import express from 'express';
import request from 'supertest';

const app = express();
// app.use(express.static(__dirname+'/static'));
app.use('/static',express.static(__dirname+'/static'));

app.get('/',(req, res) => {
  res.send(`Hello Response`);
});

app.get('/sample.txt',(req, res) => {
  res.send(`Hello Sample`);
});

test("test static", async() => {
  let response = await request(app).get('/');
  expect(response.text).toBe('Hello Response');
  response = await request(app).get('/sample.txt');
  expect(response.text).toBe('This is sample text');
});

test("test static prefix failed", async() => {
  const response = await request(app).get('/sample.txt');
  expect(response.text).toBe('This is sample text');
});

test("test static prefix success", async() => {
  const response = await request(app).get('/static/sample.txt');
  expect(response.text).toBe('This is sample text');
});