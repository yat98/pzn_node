import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(cookieParser('SECRETKEYRAHASIA'));

app.get('/',(req,res) => {
  const name = req.body.name;
  res.cookie('Login',name,{path:'/',signed: true});
  res.send(`Hello ${name}`);
});

app.get('/login', (req,res) => {
  const name = req.signedCookies['Login'];
  res.send(`Hello ${name}`);
});

test('test signed cookie read', async () => {
  const response = await request(app).get('/login')
    .set('Cookie','Login=s%3AHidayat.wLNEgXQA%2Bxes3f2lhqrmspBU6eiKDUg3NM9Zt2adCDA;Path=/');
  expect(response.text).toBe('Hello Hidayat')
});

test('test signed cookie write', async () => {
  const response = await request(app).get('/')
    .send({name: 'Hidayat'});
  console.info(response.get('Set-Cookie').toString());
  expect(response.text).toBe('Hello Hidayat');
  expect(response.get('Set-Cookie').toString()).toContain('Hidayat');
});