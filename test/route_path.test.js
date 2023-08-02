import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/products/*.json',(req, res) => {
    res.send(req.originalUrl);
  });

  app.get('/categories/*(\\d+).json',(req, res) => {
    res.send(req.originalUrl);
  });

  let response = await request(app).get('/products/hidayat.json');
  expect(response.text).toBe('/products/hidayat.json');

  response = await request(app).get('/products/salah.json');
  expect(response.text).toBe('/products/salah.json');

  response = await request(app).get('/categories/123.json');
  expect(response.text).toBe('/categories/123.json');

  response = await request(app).get('/categories/hidayat.json');
  expect(response.status).toBe(404);
});