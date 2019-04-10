const User = require('../models/user.model');

const userController = {};

userController.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user);
};

userController.getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

userController.addUser = async (req, res) => {
  const user = new User(req.body);

  await user.save();

  res.json({
    status: 200,
    response: 'User saved'
  });
};

userController.editUser = async (req, res) => {
  const user = {
    email: req.body.email,
    name: req.body.name,
    user: req.body.user,
    password: req.body.password
  };

  const { id } = req.params;

  // Busca y lo actualiza y si no esta no lo crea
  await User.findByIdAndUpdate(id, { $set: user }, { new: false });

  res.json({
    status: 200,
    response: 'User edited'
  })
};

userController.deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndRemove(id);
  res.json({
    status: 200,
    response: 'User deleted'
  })
};

module.exports = userController;