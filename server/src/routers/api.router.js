const express = require('express');
const router = express.Router();
const authJwt = require('../utils/authJwt.js');
const authController = require("../controllers/auth.controller");
const userController = require('../controllers/user.controller');
const sensorController = require('../controllers/sensor.controller');
const userValidate = require('../validates/user.validate');

// Default
router.get('/', (req, res) => res.send());
  
// Auth Router
router.post("/api/auth/signin", authController.signin);

// User Router
router.get('/api/users/:id', [authJwt.verifyToken], userController.getUser);
router.get('/api/users', [authJwt.verifyToken], userController.getUsers);
router.post('/api/users', [authJwt.verifyToken], userController.addUser);
router.put('/api/users/:id', [authJwt.verifyToken, userValidate.update], userController.updateUser)
router.delete('/api/users/:id', [authJwt.verifyToken], userController.deleteUser);

// Sensor Data Router
router.get('/api/datasensors/lastest',[authJwt.verifyToken], sensorController.getDataSensorLastest);
router.get('/api/datasensors', [authJwt.verifyToken], sensorController.getDataSensors);
router.post('/api/datasensors/changeconfig',[authJwt.verifyToken], sensorController.changeConfigSensor);

module.exports = router;
