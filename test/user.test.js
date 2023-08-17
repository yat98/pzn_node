import supertest from "supertest";
import { web } from "../src/applications/web.js";
import { prismaClient } from "../src/applications/database.js";

describe('POST /api/users', () => {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: 'hidayat',
      },
    });
  });

  it('should can register user', async () => {
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'hidayat',
        password: 'rahasia',
        name: 'Hidayat'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('hidayat');
    expect(result.body.data.name).toBe('Hidayat');
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
      username: 'hidayat',
      password: 'rahasia',
      name: 'Hidayat'
    };

    let result = await supertest(web)
      .post('/api/users')
      .send(input);
    
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('hidayat');
    expect(result.body.data.name).toBe('Hidayat');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web)
      .post('/api/users')
      .send(input);


    expect(result.status).toBe(422);
    expect(result.body.errors).toBeDefined();
    expect(result.body.errors).toBe('User already exists');
  });
});