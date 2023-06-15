import * as actionTypes from './actionTypes';
import * as actionPayloadTypes from 'models/Sensor';

export const getDataSensor = () => {
  return {type: actionTypes.SENSOR_GET_DATA};
};

export const getDataSensorSuccess = (payload: actionPayloadTypes.GetDataSensorSuccessPayload) => {
  return {type: actionTypes.SENSOR_GET_DATA_SUCCESS, payload};
};


export const changeConfigSensor = (payload: actionPayloadTypes.SensorInfo) => {
  return {type: actionTypes.SENSOR_CHANGE_DATA, payload};
};

export const changeConfigSensorSuccess = (payload: actionPayloadTypes.GetDataSensorSuccessPayload) => {
  return {type: actionTypes.SENSOR_CHANGE_DATA_SUCCESS, payload};
};