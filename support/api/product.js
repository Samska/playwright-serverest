const { faker } = require("@faker-js/faker");
const Joi = require('joi');

const productBody = {
  nome: faker.commerce.productName(),
  preco: faker.number.int(),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({min: 10}),
};

const productSchema = Joi.object({
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().required(),
  quantidade: Joi.number().required(),
  _id: Joi.string().required()
});

const createProduct = async (request, productBody, authorization) => {
  const response = await request.post("/produtos", {
    data: productBody,
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson, productId: responseJson._id };
};

const getProductById = async (request, productId) => {
  const response = await request.get(`/produtos/${productId}`);
  const responseJson = await response.json();
  return { response, responseJson };
};

const updateProduct = async (request, productId, productBody, authorization) => {
  const response = await request.put(`/produtos/${productId}`, {
    data: productBody,
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson };
};

const deleteProduct = async (request, productId, authorization) => {
  const response = await request.delete(`/produtos/${productId}`, {
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson };
}

module.exports = {
  productBody,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  productSchema
};