import * as actionTypes from 'pages/Control/redux/actionTypes';

export type InitialStateAuth = {
  type: string;
  isProcessing: boolean;
  statusCode: string;
  message: string;
  sensorInfo: SensorInfo;
};

export type SensorInfo = {
  EnvTemp: number;
  EnvTempMin: number;
  EnvTempMax: number;
  EnvHumi: number;
  EnvHumiMin: number;
  EnvHumiMax: number;
  PH: number;
  PHMin: number;
  PHMax: number;
  Flow: number;
  StartPump: number;
  StaLight: number;
  StartCharge: number;
  StarDisch: number;
  PumTemp: number;
  Illu: number;
  StaPump: number;
  StaCharge:number;
};

export type sensorInfoPayload = {
  EnvTemp: number;
  EnvTempMin: number;
  EnvTempMax: number;
  EnvHumi: number;
  EnvHumiMin: number;
  EnvHumiMax: number;
  PH: number;
  PHMin: number;
  PHMax: number;
  Flow: number;
  StartPump: number;
  StaLight: number;
  StartCharge: number;
  StarDisch: number;
};

export type GetDataSensorSuccessPayload = {
   statusCode: string;
   statusMessage: string;
   message: string;
   data: {
     sensorInfo: SensorInfo;
  }
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
  type: typeof actionTypes.SENSOR_API_FALSE;
  payload: SensorApiFalsePayload;
};

export type SensorChangeDataSensorRequestAction = {
  type: typeof actionTypes.SENSOR_GET_DATA;
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
  | SensorApiFalseAction
  | SensorGetDataSuccessAction;