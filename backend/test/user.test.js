const request = require('supertest');

const db = require('../src/config/db');
const app = require('../src/app');

beforeAll(async () => {
  await db.migrate.latest()
})

afterAll(async () => {
  await db.migrate.rollback()
})

it('Should be able to create a new user', async () => {
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
      pis: "111222333"
    });

  expect(response.status).toBe(204);
});

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
    pis: "333222111"
  });

  expect(response.status).toBe(400);
  expect(response.text).toBe('Usuário já cadastrado');
});