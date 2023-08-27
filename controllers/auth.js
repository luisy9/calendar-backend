const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { password, email } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese email',
      });
    }
    usuario = new Usuario(req.body);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario._id,
      name: usuario.name,
      token
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hay un error',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { password, email } = req.body;

  //Probar codigo
  try {

    //Confirmar si el email existe en la bd
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
    }

    //Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'El password es incorrecto',
      });
    }

    //Generar nuestro JWT

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      msg: 'Iniciado sesion correctamente'
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Erooooor',
    });
  }
};

//Renovar Usuario
const renewUser = (req, res = response) => {
  const { name, email, password } = req.body;
  res.json({
    ok: true,
    name,
    email,
    password,
  });
};

const revalidarToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  createUser,
  loginUser,
  renewUser,
  revalidarToken
};
