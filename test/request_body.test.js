import express from 'express';
import request from 'supertest';

const app = express();

test('test json request body', async () => {
  app.use(express.json());
  app.post('/json', (req,res) => {
    const name = req.body.name;
    res.json({
      hello: `Hello ${name}`
    });
  });

  const response = await request(app)
    .post('/json')
    .set('content-type','application/json')
    .send({
      name: 'Hidayat'
    });
  expect(response.get('Content-Type')).toContain('application/json');
  expect(response.body).toEqual({hello: 'Hello Hidayat'});
});

test('test form request body', async () => {
  app.use(express.urlencoded({extended: false}));
  app.post('/form', (req,res) => {
    const name = req.body.name;
    res.json({
      hello: `Hello ${name}`,
      content_type: req.get('content-type')
    });
  });

  const response = await request(app)
    .post('/form')
    .set('Content-Type','application/x-www-form-urlencoded')
    .send('name=World');
  expect(response.body.content_type).toContain('application/x-www-form-urlencoded');
  expect(response.body).toEqual({hello: 'Hello World',content_type: 'application/x-www-form-urlencoded'});
});