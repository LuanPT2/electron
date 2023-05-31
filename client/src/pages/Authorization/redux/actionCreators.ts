import * as actionTypes from './actionTypes';
import * as actionPayloadTypes from 'models/User';

export const loginRequest = (payload: actionPayloadTypes.LoginRequestPayload) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload,
  };
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

export const loginRequestSuccess = (payload: actionPayloadTypes.LoginRequestSuccessPayload) => {
  return {
    type: actionTypes.LOGIN_REQUEST_SUCCESS,
    payload,
  };
};

export const loginRequestFailed = (payload: actionPayloadTypes.LoginRequestFailedPayload) => {
  return {
    type: actionTypes.LOGIN_REQUEST_FAILED,
    payload,
  };
};

export const resetTypeAuth = () => {
  return {
    type: actionTypes.RESET_TYPE_AUTH,
  };
};

