const userDao = require('../dao/user.dao');

// imports para la autentcacion con jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'elkinkey';

const userController = {};

//Obtener usuario por su username
userController.getUserByUsername = (req, res) => {
  userDao.getUserByUsername(req.params.username, (err, user) => {
    res.json(user);
  });
};

//Obtener usuario por su email
userController.getUserByEmail = (req, res) => {
  userDao.getUserByEmail(req.params.email, (err, user) => {
    res.json(user);
  });
};

userController.getUser = (req, res) => {
  userDao.getUser(req.params.id, (err, user) => {
    res.json(user);
  });
};

userController.getUsers = (req, res) => {
  userDao.getUsers((err, users) => {
    res.json(users);
  });
};

userController.addUser = (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password);

  userDao.addUser(user, (err, user) => {
    const expiresIn = 24 * 60 * 60;
    const acessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: expiresIn });

    res.json({
      status: 200,
      response: 'User saved',
      jwt: acessToken,
      expiresIn: expiresIn
    });
  });
};

userController.signinUser = (req, res) => {
  const userLogin = req.body;
  console.log(userLogin);

  userDao.getUserByUsername(userLogin.username, (err, user) => {
    if (!user) {
      res.status(409).send({ message: "Invalid User" });
    }
    else {
      console.log(userLogin.password, user[0].password);
      if (bcrypt.compareSync(userLogin.password, user[0].password)) {
        const expiresIn = 24 * 60 * 60;
        const acessToken = jwt.sign({ id: user[0]._id }, SECRET_KEY, { expiresIn: expiresIn });

        res.json({
          status: 200,
          response: 'User logged',
          jwt: acessToken,
          expiresIn: expiresIn
        });
      }
      else {
        res.status(409).send({ message: "Invalid Password"});
      }
    }
  });
};

module.exports = userController;