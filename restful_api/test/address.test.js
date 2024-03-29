import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeTestAddress, removeTestContact, removeTestUser } from "./utils/test-util";

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterAll(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it('should can create address', async () => {
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
      .post(`/api/contacts/${currentContact.id}/addresses`)
      .set('Authorization', result.body.data.token)
      .send({
        street: "Lorem Road",
        city: "Ipsum City",
        province: "Sit Dolor",
        country: "Amet",
        postal_code: "123",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Lorem Road');
    expect(result.body.data.city).toBe('Ipsum City');
    expect(result.body.data.province).toBe('Sit Dolor');
    expect(result.body.data.country).toBe('Amet');
    expect(result.body.data.postal_code).toBe('123');
  });

  it('should can create address only required request', async () => {
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
      .post(`/api/contacts/${currentContact.id}/addresses`)
      .set('Authorization', result.body.data.token)
      .send({
        country: "Amet",
        postal_code: "123",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBeNull();
    expect(result.body.data.city).toBeNull();
    expect(result.body.data.province).toBeNull();
    expect(result.body.data.country).toBe('Amet');
    expect(result.body.data.postal_code).toBe('123');
  });

  it('should reject create address', async () => {
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
      .post(`/api/contacts/${currentContact.id}/addresses`)
      .set('Authorization', result.body.data.token)
      .send({});
      
    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if contact not found', async () => {
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
      .post(`/api/contacts/${currentContact.id + 1}/addresses`)
      .set('Authorization', result.body.data.token)
      .send({
        country: "Amet",
        postal_code: "123",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should reject without token', async () => {
    const currentContact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${currentContact.id}/addresses`)
      .send({});
      
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterAll(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it('should can get address', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .get(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Lorem Road');
    expect(result.body.data.city).toBe('Ipsum City');
    expect(result.body.data.province).toBe('Sit Dolor');
    expect(result.body.data.country).toBe('Amet');
    expect(result.body.data.postal_code).toBe('123');
  });

  it('should return 404 if contact not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();
    result = await supertest(web)
      .get(`/api/contacts/${currentContact.id + 1}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should return 404 if address not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();
    result = await supertest(web)
      .get(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id + 1}`)
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Address not found');
  });

  it('should reject get address', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get(`/api/contacts/asd/addresses/asd`)
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject without token', async () => {
    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`);
      
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterAll(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it('should can update address', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .put(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentAddress.id,
        street: "Lorem Update Road",
        city: "Ipsum Update City",
        province: "Sit Update Dolor",
        country: "Amet Update",
        postal_code: "1234",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe('Lorem Update Road');
    expect(result.body.data.city).toBe('Ipsum Update City');
    expect(result.body.data.province).toBe('Sit Update Dolor');
    expect(result.body.data.country).toBe('Amet Update');
    expect(result.body.data.postal_code).toBe('1234');
  });

  it('should can update address only required request', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .put(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentAddress.id,
        country: "Amet Update 2",
        postal_code: "12345",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.country).toBe('Amet Update 2');
    expect(result.body.data.postal_code).toBe('12345');
  });

  it('should reject update address', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .put(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token)
      .send({});

    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if contact not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .put(`/api/contacts/${currentContact.id + 1}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentAddress.id,
        country: "Amet Update 2",
        postal_code: "12345",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 if address not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    result = await supertest(web)
      .put(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id + 1}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentAddress.id,
        country: "Amet Update 2",
        postal_code: "12345",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject update without token', async () => {
    const currentContact = await getTestContact();
    const currentAddress = await getTestAddress();

    const result = await supertest(web)
      .put(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .send({
        id: currentAddress.id,
        country: "Amet Update 2",
        postal_code: "12345",
      });

    expect(result.status).toBe(401);   
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterAll(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestAddress();
  });

  afterEach(async () => {
    await removeTestAddress();
  });

  it('should can remove address', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    let currentAddress = await getTestAddress();

    result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token);
    
    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');
    
    currentAddress = await getTestAddress();
    expect(currentAddress).toBeNull()
  });

  it('should return 404 if contact not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    let currentAddress = await getTestAddress();

    result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id + 1}/addresses/${currentAddress.id}`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should return 404 if address not found', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    let currentAddress = await getTestAddress();

    result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id}/addresses/${(currentAddress.id + 2)}`)
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Address not found');
  });

  it('should reject without token', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    const currentContact = await getTestContact();
    let currentAddress = await getTestAddress();

    result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id}/addresses/${currentAddress.id}`);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId/addresses', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterAll(async () => {
    await removeTestAddress();
    await removeTestContact();
    await removeTestUser();
  });

  it('should can get list address', async () => {
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
      .get(`/api/contacts/${currentContact.id}/addresses`)
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.length).toBe(1);
  });

  it('should return 404 when get list address', async () => {
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
      .get(`/api/contacts/${currentContact.id + 1}/addresses`)
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject without token', async () => {
    const currentContact = await getTestContact();

    const result = await supertest(web)
      .get(`/api/contacts/${currentContact.id}/addresses`);
      
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});