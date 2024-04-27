const Joi = require('joi');

const cartSchema = Joi.object({
  _id: Joi.string().required(),
  precoTotal: Joi.number().unsafe().required(),
  idUsuario: Joi.string().required(),  
  quantidadeTotal: Joi.number().required(),
  produtos: Joi.array().items(
    Joi.object({
      idProduto: Joi.string().required(),
      quantidade: Joi.number().required(),
      precoUnitario: Joi.number().required(),
    })
  ).required(),
});

const getCarts = async (request) => {
  const response = await request.get("/carrinhos");
  const responseJson = await response.json();
  return { response, responseJson };
};

const createCart = async (request, productId, productQty, authorization) => {
  const response = await request.post("/carrinhos", {
    data: {
      produtos: [{ idProduto: productId, quantidade: productQty }],
    },
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson, cartId: responseJson._id };
};

const getCartById = async (request, cartId, authorization) => {
  const response = await request.get(`/carrinhos/${cartId}`, {
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson };
};

const deleteCart = async (request, authorization) => {
  const response = await request.delete("/carrinhos/concluir-compra", {
    headers: { Authorization: authorization },
  });
  const responseJson = await response.json();
  return { response, responseJson };
};

module.exports = {
  getCarts,
  createCart,
  getCartById,
  deleteCart,
  cartSchema
};
