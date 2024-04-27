const { faker } = require("@faker-js/faker");

const productBody = {
  nome: faker.commerce.productName(),
  preco: faker.commerce.price(),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int(100),
};

module.exports = {
  productBody,
};