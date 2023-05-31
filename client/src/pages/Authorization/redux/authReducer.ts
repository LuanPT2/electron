import * as actionTypes from './actionTypes';
import * as actionPayloadTypes from 'models/User';

export const initialStateAuth: actionPayloadTypes.InitialStateAuth = {
  type: '',
  isProcessing: false,
  statusCode: '',
  message: '',
  accessToken: '',
  user: {} as actionPayloadTypes.UserInfo,
  isSuccess: false,
};

const authReducer = (
  state: actionPayloadTypes.InitialStateAuth = initialStateAuth,
  action: actionPayloadTypes.LoginRequestActions,
) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        type: action.type,
        isProcessing: true,
      };

    case actionTypes.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        type: action.type,
        isProcessing: false,
        statusCode: action.payload.status,
        message: action.payload.message,
        accessToken: action.payload.data?.jwt || '',
        user: action.payload.data?.user || {},
      };

    case actionTypes.LOGIN_REQUEST_FAILED:
      return {
        ...state,
        type: action.type,
        isProcessing: false,
        statusCode: action.payload?.status || '',
        message: action.payload?.error || '',
      };

    case actionTypes.RESET_TYPE_AUTH:
      return {
        ...state,
        type: action.type,
        isProcessing: false,
      };

    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        type: action.type,
        accessToken: '',
        isProcessing: false,
        user: {} as actionPayloadTypes.UserInfo,
      };

    default:
      return state;
  }
};

export default authReducer;
