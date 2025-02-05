const request = require('supertest');
const app = require('../server');

let token = '';

describe('Authentication Tests', () => {
  it('Should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('Should login the user and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });
});

describe('Blog Route Tests', () => {
  it('Should deny access to protected route without token', async () => {
    const res = await request(app).post('/api/blogposts').send({ title: 'Test Post', content: 'This is a test.' });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error).toEqual('No token, authorization denied');
  });

  it('Should allow access to protected route with token', async () => {
    const res = await request(app)
      .post('/api/blogposts')
      .set('Authorization', token)
      .send({ title: 'Test Post', content: 'This is a test.' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Post');
  });
});
