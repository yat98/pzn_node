import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/',(req, res) => {
    if(req.query.name){
      res.status(200).send(`Hello ${req.query.name}`);
    }else{
      res.status(400).end();
    }
  });

  let response = await request(app).get('/')
    .query({name: 'Hidayat'});
  expect(response.status).toBe(200);
  expect(response.text).toBe('Hello Hidayat');

  response = await request(app).get('/');
  expect(response.status).toBe(400);
});