import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./utils/test-util.js";
import bcrypt from 'bcrypt';

describe('POST /api/users', () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register user', async () => {
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'rahasia',
        name: 'Test'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Test');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: '',
        password: '',
        name: '',
      });

    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    const input = {
      username: 'test',
      password: 'rahasia',
      name: 'Test'
    };

    let result = await supertest(web)
      .post('/api/users')
      .send(input);
    
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Test');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web)
      .post('/api/users')
      .send(input);


    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('User already exists');
  });
});

describe('POST /api/users/login', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });
    
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });

  it('should reject login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: '',
        password: ''
      });

      expect(result.status).toBe(422);
      expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: '1rahasia1'
      });

      expect(result.status).toBe(401);
      expect(result.body.errors).toBeDefined();
      expect(result.body.errors).toBe('Username or password wrong');
  });
});

describe('GET /api/users/current', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
  });

  it('should reject if token invalid', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'f60ba460-883d-46f2-a736-299430bb04e1');
    
    expect(result.body);
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Unauthorized');
  });

  it('should reject if not have token', async () => {
    let result = await supertest(web)
      .get('/api/users/current');
      
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Unauthorized');
  });
});

describe('PATCH /api/users/current', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it('should can update user', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', result.body.data.token)
      .send({
        'name': 'Hidayat',
        'password': 'rahasialagi',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Hidayat');
    
    const currentUser = await getTestUser();
    expect(await bcrypt.compare('rahasialagi',currentUser.password)).toBe(true);
  });

  it('should can update user name only', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasialagi'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', result.body.data.token)
      .send({
        'name': 'Hidayat',
      });
      
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('Hidayat');
  });

  it('should can update user password only', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasialagi'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', result.body.data.token)
      .send({
        'password': 'rahasialagi2',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    
    const currentUser = await getTestUser();
    expect(await bcrypt.compare('rahasialagi2',currentUser.password)).toBe(true);
  });

  it('should can reject update user', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasialagi2'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', result.body.data.token)
      .send({
        password: 'The-frozen-ground,-hard-and-cold,-lumped-under-their-blanket,-dug-into-them.-She-followed-his-finger-to-the-sky.-',
        name: 'The-frozen-ground,-hard-and-cold,-lumped-under-their-blanket,-dug-into-them.-She-followed-his-finger-to-the-sky.-',
      });

      expect(result.status).toBe(422);
      expect(result.body.errors).toBeDefined();
  });

  it('should can reject user without token', async () => {
    let result = await supertest(web)
      .patch('/api/users/current')
      .set('Authorization', 'invalidtoken')
      .send({});

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/users/logout', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });
    const token = result.body.data.token;
    
    expect(result.status).toBe(200);
    expect(token).toBeDefined();
  
    result = await supertest(web)
      .delete('/api/users/logout')
      .set('Authorization', token);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data).toBe('OK');

    result = await supertest(web)
    .get('/api/users/current')
    .set('Authorization', token);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();

    const currentUser = await getTestUser();
    expect(currentUser.token).toBeNull();
  });

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(web)
      .delete('/api/users/logout')
      .set('Authorization', 'invalidtoken');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});