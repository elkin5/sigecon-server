const User = require('../models/user.model');

userDao = {};

userDao.addUser = async (user, cb) => {  
  const userSave = await user.save(cb);
};

//Obtener usuario por su username
userDao.getUserByUsername = async (username, cb) => {
  const user = await User.find({ "username": username }, cb);
};

//Obtener usuario por su email
userDao.getUserByEmail = async (email, cb) => {
  const user = await User.find({ "email": email }, cb);
};

userDao.getUser = async (id, cb) => {
  const user = await User.findById(id, cb);
};

userDao.getUsers = async (cb) => {
  const users = await User.find(cb);
};

// userController.editUser = async (req, res) => {
//   const user = {
//     email: req.body.email,
//     fullname: req.body.fullname,
//     username: req.body.username,
//     password: req.body.password
//   };

//   const { id } = req.params;

//   // Busca y lo actualiza y si no esta no lo crea
//   await User.findByIdAndUpdate(id, { $set: user }, { new: false });

//   res.json({
//     status: 200,
//     response: 'User edited'
//   })
// };

// userController.deleteUser = async (req, res) => {
//   const { id } = req.params;

//   await User.findByIdAndRemove(id);
//   res.json({
//     status: 200,
//     response: 'User deleted'
//   })
// };

module.exports = userDao;