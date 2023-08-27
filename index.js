require('dotenv').config();
const express = require('express');
const { dbcConnection } = require('./database/config');

// console.log(process.env);


//Crear el servidor de express

const app = express();

//Base de datos
dbcConnection();

//Directorio Publico
app.use( express.static('public') )

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
//TODO: auth // crear, login, renew
//TODO: CRUD: Eventos

//Escuchar las peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});