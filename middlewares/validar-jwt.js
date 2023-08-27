const { response } = require('express');

const validarJWT = (req, res = response, next) => {
  //X-TOKEN
  const token = req.header('x-token');

  console.log(token);

  next();
};

module.exports = { validarJWT };
