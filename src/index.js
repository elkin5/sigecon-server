const express = require('express');
const morgan = require('morgan');
const { mongoose } = require('./database/managerDB');

const app = express();

//Setting : configuraciones del servidor
app.set('port', process.env.PORT || 3000);

//Midlewares : ejecuciones de metodos 

//verificar mensajes en consola de las peticiones 'dev' es la forma como se ven
app.use(morgan('dev'));
//ver datos enviados en formato .json
app.use(express.json());

//Routes : rutas del servidor o apis
app.use('/api/users', require('./api/user.api'));

// start : inicio del servidor
app.listen(app.get('port'), () => {
  console.log(`listen on port ${app.get('port')}`);
});
