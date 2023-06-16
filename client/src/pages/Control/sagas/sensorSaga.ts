import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'api/Api';
import * as actionTypes from '../redux/actionTypes';
import * as actionPayloadTypes from 'models/Sensor';
function* getDataSensorLastest() {
  try {
    const response = yield call(() => API.get(ROUTES.API_SENSOR_GET_DATA));

    const { data } = response;

    if (response.ok) {
      if (data?.statusCode === 200) {
        yield put({
          type: actionTypes.SENSOR_GET_DATA_SUCCESS,
          payload: data,
        });
      } else {
        yield put({
          type: actionTypes.SENSOR_API_FALSE,
          payload: data,
        });
      }
    } else {
      yield put({
        type: actionTypes.SENSOR_API_FALSE,
        payload: data,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: actionTypes.SENSOR_API_FALSE, payload: error });
  }
}

function* changeDataSensorConfig(payload: actionPayloadTypes.SensorChangeDataSensorRequestAction) {
    try {
      const response = yield call(() => API.post(ROUTES.API_SENSOR_CHANGE_CONFIG, payload));
  
      const { data } = response;
  
      if (response.ok) {
        if (data?.statusCode === 202) {
          yield put({
            type: actionTypes.SENSOR_CHANGE_DATA_SUCCESS,
            payload: payload.payload,
          });
        } else {
          yield put({
            type: actionTypes.SENSOR_API_FALSE,
            payload: payload,
          });
        }
      } else {
        yield put({
          type: actionTypes.SENSOR_API_FALSE,
          payload: payload,
        });
      }
    } catch (error) {
      // in case: server error
      yield put({ type: actionTypes.SENSOR_API_FALSE, payload: payload });
    }
  }

function* sensorSaga() {
  yield all([
    takeLatest(actionTypes.SENSOR_GET_DATA, getDataSensorLastest),
    takeLatest(actionTypes.SENSOR_CHANGE_DATA, changeDataSensorConfig),
    // takeLatest(actionTypes.SENSOR_CHANGE_DATA, changeDataSensorControl)
  ]);
}

export default sensorSaga;
