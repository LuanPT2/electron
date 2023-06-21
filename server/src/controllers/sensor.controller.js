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
        const result = await DataSensor.filter(req.query);
        var envTemps = []; 
        var envHumis = []; 
        var envIllus = []; 
        var pHs = [];
        var waters = []; 
        var lables = []; 

        result.forEach(element => {
            envTemps.push(element.EnvTemp);
            envHumis.push(element.EnvHumi);
            envIllus.push(element.EnvIllu);
            pHs.push(element.PH);
            waters.push(element.Water);
            lables.push(element.lable);
        });

        res.send({
            statusCode: 200,
            statusMessage: 'Ok',
            message: 'Successfully retrieved all the data sensor.',
            data: {
                listDataChartInfo : {
                    envTemps:  envTemps,
                    envHumis: envHumis,
                    envIllus: envIllus,
                    pHs: pHs,
                    waters: waters,
                    lables: lables
                }
            },
        });
    } catch (err) {
        res.status(500).send({ statusCode: 500, statusMessage: 'Internal Server Error', message: null, data: null });
    }
};

const changeConfigSensor = async (req, res) => {
    try {
        await ConfigSensor.updateSensor({...req.body.payload, status:0});
        await ConfigSensor.updateDevice({...req.body.payload, status:0});
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
