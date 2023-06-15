import { create } from 'apisauce';

export const ROUTES = {
  // Auth
  API_LOGIN: '/api/auth/signin',

  API_SENSOR_GET_DATA: '/api/datasensors/lastest',
  API_SENSOR_CHANGE_CONFIG: '/api/datasensors/changeconfig',

  LIST: '/list',
  EXCEL_LIST: '/excelList',
  CREATE: '/create',
  DETAIL: '/detail',
  UPDATE: '/update',
  DELETE: '/delete',
};

export const API = create({
  baseURL: process.env.REACT_APP_API_URL,
});
