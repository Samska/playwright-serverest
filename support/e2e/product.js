const { faker } = require("@faker-js/faker");

const productData = {
  nome: faker.commerce.productName(),
  preco: faker.number.int().toString(),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 10 }).toString(),
};

const createProduct = async (page, productData) => {
  await page.fill("[data-testid='nome']", productData.nome);
  await page.fill("[data-testid='preco']", productData.preco);
  await page.fill("[data-testid='descricao']", productData.descricao);
  await page.fill("[data-testid='quantity']", productData.quantidade);
  await page.click("[data-testid='cadastarProdutos']");
};

module.exports = {
  productData,
  createProduct
};
