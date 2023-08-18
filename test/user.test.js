import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { prismaClient } from "../src/applications/database.js";
import { createTestUser, removeTestUser } from "./test-util.js";

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