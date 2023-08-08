import cookieParser from "cookie-parser";
import express from 'express';
import request from 'supertest';

const app = express();
// app.use(express.json());
app.use(cookieParser());

test('test cookie', async () => {
  app.get('/', (req,res) => {
    const name = req.cookies.name;
    res.send(`Hello ${name}`);
  });
  
  const response = await request(app).get('/')
    .set('Cookie','name=Hidayat;author=yat98');
  expect(response.text).toBe('Hello Hidayat')
});

test('test cookie', async () => {
  app.post('/login', (req,res) => {
    const name = req.body.name;
    res.cookie('login',name,{path: '/'})
    res.send(`Hello ${name}`);
  });
  
  const response = await request(app).post('/login')
    .send({name: 'Hidayat'});
  expect(response.text).toBe('Hello Hidayat')
  expect(response.get('Set-Cookie').toString()).toContain('Hidayat')
});