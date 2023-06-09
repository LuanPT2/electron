import * as actionTypes from '../action/actionTypes';
import * as actionPayloadTypes from 'models/Sensor';

export const initialStateAuth: actionPayloadTypes.InitialStateSensor = {
  type: '',
  isProcessing: false,
  statusCode: '',
  message: '',
  sensorInfo:{} as actionPayloadTypes.SensorInfo,
};

const sensorReducer = (
  state: actionPayloadTypes.InitialStateSensor = initialStateAuth,
  action: actionPayloadTypes.RequestActions,
) => {
  switch (action.type) {
    case actionTypes.SENSOR_GET_DATA:
      return {
        ...state,
        type: action.type,
        isProcessing: true,
      };

    case actionTypes.SENSOR_GET_DATA_SUCCESS:
        return {
          ...state,
          type: action.type,
          isProcessing: true,
          sensorInfo: action.payload.data.sensorInfo || {},
        };

    case actionTypes.SENSOR_CHANGE_DATA_SUCCESS:
          return {
            ...state,
            type: action.type,
            isProcessing: true
          };

    case actionTypes.SENSOR_CHANGE_DATA_FALSE:
      return {
        ...state,
        type: action.type,
        isProcessing: false,
      };

    default:
      return state;
  }
};

export default sensorReducer;
