import * as actionTypes from './actionTypes';
import * as actionPayloadTypes from 'models/Sensor';

// Get get data control
export const getDataSensor = () => {
  return {type: actionTypes.SENSOR_GET_DATA};
};

export const getDataSensorSuccess = (payload: actionPayloadTypes.GetDataSensorSuccessPayload) => {
  return {type: actionTypes.SENSOR_GET_DATA_SUCCESS, payload};
};

export const getDataSensorFalse = (payload: actionPayloadTypes.GetDataSensorFailedPayload) => {
  return {type: actionTypes.SENSOR_GET_DATA_FALSE, payload};
};



// Change config
export const changeConfigSensor = (payload: actionPayloadTypes.SensorInfo) => {
  return {type: actionTypes.SENSOR_CHANGE_DATA, payload};
};

export const changeConfigSensorSuccess = (payload: actionPayloadTypes.GetDataSensorSuccessPayload) => {
  return {type: actionTypes.SENSOR_CHANGE_DATA_SUCCESS, payload};
};

export const changeConfigSensorFalse = (payload: actionPayloadTypes.GetDataSensorSuccessPayload) => {
  return {type: actionTypes.SENSOR_CHANGE_DATA_SUCCESS, payload};
};

