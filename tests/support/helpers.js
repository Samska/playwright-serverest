const { faker } = require("@faker-js/faker");

const userBody = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: "true",
};

const productBody = {
  nome: faker.commerce.productName(),
  preco: faker.commerce.price(),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int(100)
}

const postUser = async (request, body) => {
  const response = await request.post("/usuarios", { data: body });
  const responseJson = await response.json();
  return { response, responseJson };
}

const getUser = async (request, id) => {
  const response = await request.get(`/usuarios/${id}`);
  const responseJson = await response.json();
  return { response, responseJson };
}

const performLogin = async (request, email, password) => {
  const response = await request.post("/login", {
    data: { email, password },
  });
  const responseJson = await response.json();
  return responseJson.authorization;
}

module.exports = {
  userBody,
  postUser,
  getUser,
  performLogin,
  productBody
}