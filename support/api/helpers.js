const performLogin = async (request, email, password) => {
  const response = await request.post("/login", {
    data: { email, password },
  });
  const responseJson = await response.json();
  return { response, responseJson, authorization: responseJson.authorization };
};

module.exports = {
  performLogin
};