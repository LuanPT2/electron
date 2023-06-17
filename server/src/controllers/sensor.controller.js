const DataSensor = require('../models/sensor.model');
const ConfigSensor = require('../models/config.model');
var bcrypt = require("bcryptjs");

const getDataSensorLastest = async (req, res) => {
    try {
        const dataSensor = await DataSensor.getLatestData({});
        const resultConfig = await ConfigSensor.filter({});
        const result = {
            ...dataSensor[0],
            ...resultConfig[0]
        }

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved the lastest data sensor.',
            data: {
                sensorInfo: result
                }
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
            data: {result},
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const changeConfigSensor = async (req, res) => {
    try {
        await ConfigSensor.update({...req.body.payload, status:0});
        return res.status(202).send({
            statusCode: 202,
            statusMessage: 'Accepted',
            message: 'Successfully updated a user.',
            data: {
                isSuccess: true,
            },
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null,});
    }
};

module.exports = {
    getDataSensorLastest,
    getDataSensors,
    changeConfigSensor,
};
