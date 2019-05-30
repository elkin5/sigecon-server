const mongoose = require('mongoose');

// de la variable requerida solo obtengo el objeto schema
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
  active : { type: Boolean, required: true}
}, { timestamps: true });

const model = mongoose.model('User', userSchema);

module.exports = model;
