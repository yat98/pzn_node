import express, { text } from 'express';
import request from 'supertest';
import expressFileUpload from 'express-fileupload';

const app = express();
app.use(expressFileUpload());

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

test('test request file upload', async () => {
  app.use(express.json());

  app.post('/upload', async (req,res) => {
    const name = req.body.name;
    const textFile = req.files.article;
    await textFile.mv(__dirname + '/uploads/' + textFile.name);
    res.send(`Hello ${name}, you uploaded ${textFile.name}`);
  });

  const response = await request(app).post('/upload')
    .set('content-type','multipart/form-data')
    .field('name', 'Hidayat')
    .attach('article', __dirname + '/sample.txt');

  expect(response.text).toBe('Hello Hidayat, you uploaded sample.txt');
});