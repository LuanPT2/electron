import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'api/Api';
import * as actionTypes from '../redux/actionTypes';
import * as actionPayloadTypes from 'models/User';
import { deleteCookie, setCookie } from 'utils/helper/cookiesFunc';

function* loginRequest(action: actionPayloadTypes.LoginRequestAction) {
  try {
    const response = yield call(() => API.post(ROUTES.API_LOGIN, action.payload));

    const { data } = response;

    if (response.ok) {
      if (data?.statusCode === 200) {
        yield put({
          type: actionTypes.LOGIN_REQUEST_SUCCESS,
          payload: data,
        });

        // set Token Cookies
        if (action.payload.rememberMe) {
          setCookie('token', data?.data?.accessToken, 0.01);
        } else {
          setCookie('token', data?.data?.accessToken, 0.01);
        }
      } else {
        yield put({
          type: actionTypes.LOGIN_REQUEST_FAILED,
          payload: data,
        });
      }
    } else {
      yield put({
        type: actionTypes.LOGIN_REQUEST_FAILED,
        payload: data,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: actionTypes.LOGIN_REQUEST_FAILED, payload: error });
  }
}

function* logoutRequest() {
  // delete Token Cookies
  yield deleteCookie('token');
  API.deleteHeader('Authorization');
}

function* authSaga() {
  yield all([
    takeLatest(actionTypes.LOGIN_REQUEST, loginRequest),
    takeLatest(actionTypes.LOGOUT_REQUEST, logoutRequest),
  ]);
}

export default authSaga;
