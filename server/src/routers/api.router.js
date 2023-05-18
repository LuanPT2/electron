const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');


// User Router
router.get('/users/:id', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.route('/users/:id').put(userController.updateUser)
router.route('/users/:id').delete(userController.deleteUser);

module.exports = router;
