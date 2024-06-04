const request = require('supertest');
const app = require('../../app.js');

describe('User Registration and Login Flow', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should log in an existing user successfully', async () => {
    // Przed wykonaniem tego testu załóżmy, że użytkownik "Test User" został już zarejestrowany w bazie danych
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 when trying to register with incomplete data', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({
        name: 'Incomplete User',
        // Brak wymaganych pól: email i password
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required');
  });

  it('should return 404 when trying to log in with non-existing user', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'nonexisting@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'User not found, sign up!');
  });

  it('should return 400 when trying to log in with incorrect password', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({
        email: 'test@example.com',
        password: 'incorrectpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
