const mongoose = require('mongoose');

const conecctionURI = require('../config/properties').DB;

mongoose.connect(conecctionURI, { useNewUrlParser: true })
  .then(db => console.log('DB is connect'))
  .catch(err => console.error(err));

module.exports = mongoose;
