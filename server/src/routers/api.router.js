const express = require('express');
const router = express.Router();

const authJwt = require('../utils/authJwt.js');
const userController = require('../controllers/user.controller');
const authController = require("../controllers/auth.controller");

// Auth Router
router.post("/auth/signin", authController.signin);

// User Router
router.get('/users/:id', [authJwt.verifyToken], userController.getUser);
router.get('/users', [authJwt.verifyToken], userController.getUsers);
router.post('/users', [authJwt.verifyToken], userController.addUser);
router.put('/users/:id', [authJwt.verifyToken], userController.updateUser)
router.delete('/users/:id', [authJwt.verifyToken], userController.deleteUser);

module.exports = router;
