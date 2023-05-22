const DataSensor = require('../models/sensor.model');
var bcrypt = require("bcryptjs");

const getDataSensorLastest = async (req, res) => {
    try {
        const result = await DataSensor.getLatestData({});

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved the lastest data sensor.',
            data: result,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const getDataSensors = async (req, res) => {
    try {
        const result = await DataSensor.filter({});

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the data sensor.',
            data: result,
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

module.exports = {
    getDataSensorLastest,
    getDataSensors
};
