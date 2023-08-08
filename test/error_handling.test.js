import express from 'express';
import request from 'supertest';

test("test error handling", async() => {
  const app = express();

  const errorMiddleware = (error,req,res,next) => {
    res.status(500).send(`Terjadi error : ${error.message}`);
  };

  app.get('/',(req, res) => {
    throw new Error('Ups')
  });

  app.use(errorMiddleware);

  const response = await request(app).get('/');
  expect(response.status).toBe(500);
  expect(response.text).toBe('Terjadi error : Ups');
});