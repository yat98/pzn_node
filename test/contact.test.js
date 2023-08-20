import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeTestContact, removeTestUser } from "./utils/test-util.js";
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

describe('GET /api/contacts/:contactId', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterAll(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it('should can get contact', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    
    const currentContact = await getTestContact();
    result = await supertest(web)
      .get(`/api/contacts/${currentContact.id}`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe('John');
    expect(result.body.data.last_name).toBe('Doe');
    expect(result.body.data.email).toBe('johndoe@mail.com');
    expect(result.body.data.phone).toBe('0822222222');
  });

  it('should return 404 if contact id not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    result = await supertest(web)
      .get(`/api/contacts/${currentContact.id + 1}`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should reject get contact if contact id not a number', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    
    result = await supertest(web)
      .get(`/api/contacts/abc`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject get contact without token', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    
    result = await supertest(web)
      .get(`/api/contacts/abc`);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});