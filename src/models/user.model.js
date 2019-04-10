const mongoose = require('mongoose');

// de la variable requerida solo obtengo el objeto schema
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  user: { type: String, required: false },
  password: { type: String, required: true }
});

const model = mongoose.model('User', userSchema);

module.exports = model;
