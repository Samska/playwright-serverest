const { faker } = require("@faker-js/faker");

const userBody = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: "true",
};

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
};
