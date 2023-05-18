const express = require('express');
const router = express.Router();

const authJwt = require('../utils/authJwt.js');


const authController = require("../controllers/auth.controller");
const userController = require('../controllers/user.controller');
const userValidate = require('../validates/user.validate');


// Auth Router
router.post("/auth/signin", authController.signin);

// User Router
router.get('/users/:id', [authJwt.verifyToken], userController.getUser);
router.get('/users', [authJwt.verifyToken], userController.getUsers);
router.post('/users', [authJwt.verifyToken], userController.addUser);
router.put('/users/:id', [authJwt.verifyToken, userValidate.update], userController.updateUser)
router.delete('/users/:id', [authJwt.verifyToken], userController.deleteUser);

module.exports = router;
