import express from 'express';
import request from 'supertest';

test("test response header", async() => {
  const app = express();

  app.get('/',(req, res) => {
    res.set({
      'X-Powered-By': 'PZN',
      'X-Author': 'Hidayat'
    }).end();
  });

  let response = await request(app).get('/');

  expect(response.get('x-powered-by')).toBe('PZN');
  expect(response.get('x-author')).toBe('Hidayat');
});