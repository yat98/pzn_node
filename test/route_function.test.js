import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.route('/product')
    .get((req,res) => {
      res.send('Get product')
    })
    .post((req,res) => {
      res.send('Post product')
    })
    .put((req,res) => {
      res.send('Put product')
    });
    
  let response = await request(app).get('/product');
  expect(response.text).toBe('Get product');

  response = await request(app).post('/product');
  expect(response.text).toBe('Post product');

  response = await request(app).put('/product');
  expect(response.text).toBe('Put product');
});