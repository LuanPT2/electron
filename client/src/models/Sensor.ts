import * as actionTypes from 'pages/Control/redux/action/actionTypes';

export type InitialStateSensor = {
  type: string;
  isProcessing: boolean;
  statusCode: string;
  message: string;
  sensorInfo: SensorInfo;
};

export type SensorInfo = {
  EnvTemp: number;
  minTemp: number;
  maxTemp: number;
  EnvHumi: number;
  minHumi: number;
  maxHumi: number;
  EnvIllu: number;
  minIllu: number;
  maxIllu: number;
  Water: number;
  minWater: number;
  maxWater: number;
  PH: number;
  minPH: number;
  maxPH: number;
  StaPump: string;
  StaLight: string;
  StarDisch: string;
  StaCharge: string;
};

export type sensorInfoPayload = {
  EnvTemp: number;
  minTemp: number;
  maxTemp: number;
  EnvHumi: number;
  minHumi: number;
  maxHumi: number;
  EnvIllu: number;
  minIllu: number;
  maxIllu: number;
  Water: number;
  minWater: number;
  maxWater: number;
  PH: number;
  minPH: number;
  maxPH: number;
  StaPump: string;
  StaLight: string;
  StarDisch: string;
  StaCharge: string;
};

export type GetDataSensorSuccessPayload = {
   statusCode: string;
   statusMessage: string;
   message: string;
   data: {
     sensorInfo: SensorInfo;
  }
};

export type GetDataSensorFailedPayload = {
  code: string;
  message: string;
};

export type ChangeDataSensorSuccessPayload = {
  statusCode: string;
  statusMessage: string;
  message: string;
  data: {
    isSuccess: boolean;
 }
};

export type errorConnectServer = {
  message: string;
};

export type SensorApiFalsePayload = {
  status: string;
  error: string;
};

export type SensorGetDataRequestAction = {
  type: typeof actionTypes.SENSOR_GET_DATA;
};

export type SensorGetDataSuccessAction = {
  type: typeof actionTypes.SENSOR_GET_DATA_SUCCESS;
  payload: GetDataSensorSuccessPayload;
};

export type SensorApiFalseAction = {
  type: typeof actionTypes.SENSOR_CHANGE_DATA_FALSE;
  payload: SensorApiFalsePayload;
};

export type SensorChangeDataSensorRequestAction = {
  type: typeof actionTypes.SENSOR_GET_DATA;
  payload: SensorInfo;
};

export type SensorChangeDataSensorSuccessAction = {
  type: typeof actionTypes.SENSOR_CHANGE_DATA_SUCCESS;
  payload: SensorInfo;
};
export type changeDataSensorSuccessPayload = {
  statusCode: string;
  statusMessage: string;
  message: string;
  data: {
    isSuccess: boolean;
 }
};

export type RequestActions =
  | SensorGetDataRequestAction
  | SensorGetDataSuccessAction
  | SensorApiFalseAction
  | SensorChangeDataSensorSuccessAction;