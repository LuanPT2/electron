import { create } from 'apisauce';

export const ROUTES = {
  // Auth
  API_LOGIN: '/api/auth/signin',

  API_SENSOR_GET_DATA: '/api/datasensors/lastest',
  API_SENSOR_CHANGE_CONFIG: '/api/datasensors/changeconfig',
  API_CHART_GET_DATA: '/api/datasensors',
};

export const API = create({
  baseURL: process.env.REACT_APP_API_URL,
});
