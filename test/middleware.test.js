import express from 'express';
import request from 'supertest';

const logger = (req,res,next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
}

const addPoweredHeader = (req,res,next) => {
  res.set('x-powered-by','Hidayat');
  next();
}

const apiKeyMiddleware = (req,res,next) => {
  if(req.query.apiKey){
    next();
  }else{
    res.status(401).end();
  }
}

const requestTimeMiddleware = (req,res,next) => {
  req.requestTime = Date.now();
  next(); 
};

test("test middleware", async() => {
  const app = express();

  app.use(logger);
  app.use(apiKeyMiddleware);
  app.use(addPoweredHeader);
  app.use(requestTimeMiddleware);

  app.get('/',(req, res) => {
    res.send(`Hello Response`);
  });

  app.get('/hidayat',(req, res) => {
    res.send(`Hello Hidayat`);
  });

  app.get('/time',(req, res) => {
    res.send(`Hello, today is ${req.requestTime}`);
  });

  let response = await request(app).get('/').query({apiKey: '123'});
  expect(response.get('X-Powered-By')).toBe('Hidayat');
  expect(response.text).toBe('Hello Response');

  response = await request(app).get('/hidayat').query({apiKey: '123'});
  expect(response.get('X-Powered-By')).toBe('Hidayat');
  expect(response.text).toBe('Hello Hidayat');

  response = await request(app).get('/hidayat');
  expect(response.status).toBe(401);

  response = await request(app).get('/time').query({apiKey: '123'});
  expect(response.text).toContain('Hello, today is');
});