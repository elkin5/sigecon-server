const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/username/:username', userController.getUserByUsername);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUser);
router.post('/', userController.addUser);
// router.put('/:id', userController.editUser);
// router.delete('/:id', userController.deleteUser);

//usado para el login con jwt
//router.post('/register', userController.addUser);
router.post('/signin', userController.signinUser);

module.exports = router;