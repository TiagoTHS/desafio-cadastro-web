const request = require('supertest');

const db = require('../src/config/db');
const app = require('../src/app');

describe('Users', () => {
  beforeAll(async () => {
    await db.migrate.latest()
  })
  
  afterAll(async () => {
    await db.migrate.rollback()
  })
  
  it('should be able to create a new user', async () => {
    const response = await request(app).post('/signup')
      .send({
        name: "Test Name",
        email: "teste@teste.br",
        password: "0000",
        confirmPassword: "0000",
        country: "Teste",
        state: "Teste",
        city: "Teste",
        zipcode: "00000000",
        street: "Rua Teste",
        number: "123",
        complement: "",
        cpf: "99988877766",
        pis: "11122233300"
      })
  
    expect(response.status).toBe(204)
  })
  
  it('should not be able to create a user with exist email', async () => {
    const response = await request(app).post('/signup')
    .send({
      name: "Test Name 2",
      email: "teste@teste.br",
      password: "0001",
      confirmPassword: "0001",
      country: "Teste",
      state: "Teste",
      city: "Teste",
      zipcode: "00000001",
      street: "Rua Teste",
      number: "124",
      complement: "",
      cpf: "66677788899",
      pis: "33322211100"
    })
  
    expect(response.status).toBe(400)
    expect(response.text).toBe('Email já cadastrado')
  })

  it('should be able to authenticate with email', async () => {
    const response = await request(app).post('/signin')
    .send({
      login: "teste@teste.br",
      password: "0000",
    })
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  })
  
  it('should be able to authenticate with cpf', async () => {
    const response = await request(app).post('/signin')
    .send({
      login: "99988877766",
      password: "0000",
    })
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  })

  it('should be able to authenticate with pis', async () => {
    const response = await request(app).post('/signin')
    .send({
      login: "11122233300",
      password: "0000",
    })
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  })

  it('should not be able to authenticate with a non existing user', async () => {
    const response = await request(app).post('/signin')
    .send({
      login: "teste2@teste.br",
      password: "0000",
    })
  
    expect(response.status).toBe(400)
    expect(response.text).toBe('Usuário não encontrado!')
  })
})
