const userDao = require('../dao/user.dao');

// imports para la autentcacion con jwt
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'elkinkey';

const userController = {};

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

  const sendError = function (err) {
    res.status(500).send({ message: err.message });
  }

  req.body.password = bcrypt.hashSync(req.body.password);
  req.body.active = true;

  userDao.getUserByEmail(req.body.email, (err, user) => {
    if (err) {
      sendError(err);
    }

    if (user.length > 0) {
      res.status(409).send({ message: "Ya se encuentra una cuenta con este email" });
    }
    else {
      userDao.getUserByUsername(req.body.username, (err, user) => {
        if (err) {
          sendError(err);
        }

        if (user.length > 0) {
          res.status(409).send({ message: "Ya se encuentra una cuenta con este usuario" });
        }
        else {
          user.active = true;
          userDao.addUser(req.body, (err, user) => {
            if (err) {
              sendError(err.message);
            }
            else {
              const expiresIn = 24 * 60 * 60;

              const userData = {
                name: user.name,
                email: user.email,
                jwtAccess: jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: expiresIn }),
                expiresIn: expiresIn
              }

              res.json({
                status: 200,
                message: 'User saved',
                user: userData
              });
            }
          });
        }
      });
    }
  });
};

userController.loginUser = (req, res) => {
  const userLogin = req.body;
  console.log(userLogin);

  userDao.getUserByUsername(userLogin.username, (err, user) => {
    if (user.length == 0) {
      res.status(409).send({ message: "Invalid User" });
    }
    else {
      console.log(userLogin.password, user[0].password);
      if (bcrypt.compareSync(userLogin.password, user[0].password)) {
        const expiresIn = 24 * 60 * 60;
        const acessToken = jwt.sign({ id: user[0]._id }, SECRET_KEY, { expiresIn: expiresIn });

        const userData = {
          name: user.name,
          email: user.email,
          jwtAccess: acessToken,
          expiresIn: expiresIn
        }

        res.json({
          status: 200,
          message: 'User logged',
          user: userData
        });
      }
      else {
        res.status(409).send({ message: "Invalid Password" });
      }
    }
  });
};

module.exports = userController;