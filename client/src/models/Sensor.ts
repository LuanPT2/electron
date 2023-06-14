import * as actionTypes from 'pages/Authorization/redux/actionTypes';


export type sensorInfo = {
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
