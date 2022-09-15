const express = require('express');
// Controllers
const {createUser, getAllUsers, updateUser, deleteUser} = require('../controllers/users.controllers');
// Middleware(s)
const {createUserValidators} = require('../middlewares/validators.middlewares');
const {userExists} = require('../middlewares/users.middlewares');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:userId', userExists, updateUser);
usersRouter.delete('/:userId', userExists, deleteUser);

module.exports = {usersRouter};