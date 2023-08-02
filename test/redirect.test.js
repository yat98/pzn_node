import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/',(req, res) => {
    // res.redirect('/hello/world');
    res.redirect(301,'/hello/world');
  });

  const response = await request(app).get('/');
  expect(response.status).toBe(301);
  expect(response.get('location')).toBe('/hello/world');
});