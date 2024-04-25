import { expect } from "@playwright/test";
const { faker } = require("@faker-js/faker");

const userBody = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: "true",
};

const createUser = async (request) => {
  const response = await request.post("/usuarios", { data: userBody });
  expect(response.status()).toBe(201);
};

module.exports = {
  userBody,
  createUser,
};
