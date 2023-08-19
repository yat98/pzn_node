import supertest from "supertest";
import { createTestUser, removeTestContact, removeTestUser } from "./utils/test-util.js";
import { web } from "../src/applications/web.js";

describe('POST /api/contacts', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it('should can create contact', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization',result.body.data.token)
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@mail.com',
        phone: '08282828282',
      });

    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('John');
    expect(result.body.data.last_name).toBe('Doe');
    expect(result.body.data.email).toBe('johndoe@mail.com');
    expect(result.body.data.phone).toBe('08282828282');
  });

  it('should can create contact only required request', async() => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization',result.body.data.token)
      .send({
        first_name: 'John',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('John');
    expect(result.body.data.last_name).toBeNull();
    expect(result.body.data.email).toBeNull();
    expect(result.body.data.phone).toBeNull();
  });

  it('should reject create contact if request invalid', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization',result.body.data.token)
      .send({});

    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject without token', async () => {
    const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization','invalidtoken')
      .send({});

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});