import express from 'express';
import request from 'supertest';

test("test response", async() => {
  const app = express();

  app.get('/products/:id',(req, res) => {
    res.send(`Product: ${req.params.id}`);
  });

  app.get('/categories/:id(\\d+)',(req, res) => {
    res.send(`Categories: ${req.params.id}`);
  });

  app.get('/seller/:idSeller/product/:idProduct',(req, res) => {
    res.send(`Seller: ${req.params.idSeller} Product: ${req.params.idProduct}`);
  });

  let response = await request(app).get('/products/hidayat');
  expect(response.text).toBe('Product: hidayat');

  response = await request(app).get('/products/12');
  expect(response.text).toBe('Product: 12');

  response = await request(app).get('/categories/123');
  expect(response.text).toBe('Categories: 123');

  response = await request(app).get('/categories/hidayat');
  expect(response.status).toBe(404);

  response = await request(app).get('/seller/nokia/product/tws');
  expect(response.text).toBe('Seller: nokia Product: tws');
});