const express = require('express');
const morgan = require('morgan');

//imports de las propiedades
const port = require('./config/properties').PORT;
const urlFrontEnd = require('./config/properties').CORS;
//Se importa la conexion a la base de datos
const { dbmgr } = require('./database/managerDB');
//libreria que permite el acceso desde determinado origen
const cors = require('cors');
const app = express();

//Setting : configuraciones del servidor
app.set('port', port);

//Midlewares : ejecuciones de metodos
//verificar mensajes en consola de las peticiones 'dev' es la forma como se ven
app.use(morgan('dev'));
//ver datos enviados en formato .json
app.use(express.json());
//Permitir acceso de app al server
app.use(cors({ origin: urlFrontEnd }));

//Routes : rutas del servidor o apis
//Le digo al servidor cual va a ser el archivo que voy a utilizar para las api
//Ademas le digo que todas las peticiones iniciaran con un /api/users
app.use('/api/users', require('./api/user.api'));

// start : inicio del servidor
app.listen(port, () => {
  console.log(`listen on port ${app.get('port')}`);
});
