import { create } from 'apisauce';

export const ROUTES = {
  // Auth
  API_LOGIN: '/api/auth/signin',

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
