import supertest from "supertest";
import { createManyTestContact, createTestContact, createTestUser, getTestContact, removeTestContact, removeTestUser } from "./utils/test-util.js";
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

describe('PUT /api/contacts/:contactId', () => {
  beforeAll(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterAll(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it('should can update contact', async () => {
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
      .put(`/api/contacts/${currentContact.id}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentContact.id,
        first_name: 'John Update',
        last_name: 'Doe Update',
        email: 'johndoeupdate@mail.com',
        phone: '080808080'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(currentContact.id);
    expect(result.body.data.first_name).toBe('John Update');
    expect(result.body.data.last_name).toBe('Doe Update');
    expect(result.body.data.email).toBe('johndoeupdate@mail.com');
    expect(result.body.data.phone).toBe('080808080');
  });

  it('should can update contact only required request', async () => {
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
      .put(`/api/contacts/${currentContact.id}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: currentContact.id,
        first_name: 'John',
      });
    
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(currentContact.id);
    expect(result.body.data.first_name).toBe('John');
  });

  it('should can reject update contact', async () => {
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
      .put(`/api/contacts/${currentContact.id}`)
      .set('Authorization', result.body.data.token)
      .send({});

    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });

  it('should return 404 update contact if contact not found', async () => {
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
      .put(`/api/contacts/${currentContact.id + 1}`)
      .set('Authorization', result.body.data.token)
      .send({
        id: (currentContact.id + 1),
        first_name: 'John',
      });
    
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should can reject update contact without token', async () => {
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
      .put(`/api/contacts/${currentContact.id}`)
      .send({
        id: currentContact.id,
        first_name: 'John Update',
        last_name: 'Doe Update',
        email: 'johndoeupdate@mail.com',
        phone: '080808080'
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeAll(async () => {
    await createTestUser();
  });

  afterAll(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  beforeEach(async () => {
    await createTestContact();
  })

  it('should can remove contact', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    let currentContact = await getTestContact();    
    result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id}`)
      .set('Authorization', result.body.data.token)

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    currentContact = await getTestContact();    
    expect(currentContact).toBeNull();
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
      .delete(`/api/contacts/${currentContact.id + 1}`)
      .set('Authorization', result.body.data.token)

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('Contact not found');
  });

  it('should reject remove contact without token', async () => {
    const currentContact = await getTestContact();    
    const result = await supertest(web)
      .delete(`/api/contacts/${currentContact.id + 1}`);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts', () => {
  beforeAll(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterAll(async () => {
    await removeTestContact();
    await removeTestUser();
  });

  it('should can search without parameter', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .query({
        page: 2
      })
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search using name', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .query({
        name: 'John 1',
      })
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using email', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .query({
        email: 'johndoe1',
      })
      .set('Authorization', result.body.data.token);

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should can search using phone', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .query({
        phone: '0822222221',
      })
      .set('Authorization', result.body.data.token);
    
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it('should reject search using invalid request', async () => {
    let result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'rahasia'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();

    result = await supertest(web)
      .get('/api/contacts')
      .query({
        size: 500,
        name: 'test',
      })
      .set('Authorization', result.body.data.token);
      
    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
  });
});