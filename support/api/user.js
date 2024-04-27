const { faker } = require("@faker-js/faker");
const Joi = require('joi');

const userBody = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: "true",
};

const userSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  administrador: Joi.boolean().required(),
  _id: Joi.string().required()
});

const postUser = async (request, body) => {
  const response = await request.post("/usuarios", { data: body });
  const responseJson = await response.json();
  return { response, responseJson };
};

const getUser = async (request, id) => {
  const response = await request.get(`/usuarios/${id}`);
  const responseJson = await response.json();
  return { response, responseJson };
};

module.exports = {
  userBody,
  postUser,
  getUser,
  userSchema
};
