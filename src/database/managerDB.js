const mongoose = require('mongoose');

const conecctionURI = 'mongodb://localhost/sigecon_db';

mongoose.connect(conecctionURI, { useNewUrlParser: true })
  .then(db => console.log('DB is connect'))
  .catch(err => console.error(err));

module.exports = mongoose;
