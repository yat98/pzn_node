import express from "express";
import request from "supertest";

test('test request query', async () => {
  const app = express();

  app.get('/', (req,res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
  });

  const response = await request(app).get('/')
    .query({firstName: 'Hidayat',lastName: 'Chandra'});
  expect(response.text).toBe('Hello Hidayat Chandra');
});