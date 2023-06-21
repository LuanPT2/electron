import { all, call, cancel, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'api/Api';
import * as actionTypes from '../redux/action/actionTypes';
import * as actionPayloadTypes from 'models/Sensor';
import * as actionSearchChartPayloadTypes from 'models/SearchChart';
import * as chartsSensorReducer from '../redux/action/chartActionCreators'
function* getDataSensorLastest() {
  try {
    const response = yield call(() => API.get(ROUTES.API_SENSOR_GET_DATA));

    const { data } = response;

    if (data?.statusCode === 200) {
      yield put({
        type: actionTypes.SENSOR_GET_DATA_SUCCESS,
        payload: data,
      });
    } else {
      yield put({
        type: actionTypes.SENSOR_GET_DATA_FALSE,
        payload: data,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.CONNECT_API_ERROR, error });
  }
}

function* changeDataSensorConfig(payload: actionPayloadTypes.SensorChangeDataSensorRequestAction) {
    try {

      const response = yield call(() => API.post(ROUTES.API_SENSOR_CHANGE_CONFIG, payload));
  
      const { data } = response;
  
      if (data?.statusCode === 202) {
        yield put({
          type: actionTypes.SENSOR_CHANGE_DATA_SUCCESS,
          payload: payload.payload,
        });
      } else {
        yield put({
          type: actionTypes.SENSOR_CHANGE_DATA_FALSE,
          payload: payload,
        });
      }
    } catch (error) {
      yield put({ type: actionTypes.CONNECT_API_ERROR, error });
    }
  }

  function* chartGetListDataSensor(payload: actionSearchChartPayloadTypes.SearchChartRequestAction) {
    try {
      const response = yield call(() => API.get(ROUTES.API_CHART_GET_DATA, payload.payload));
  
      const { data } = response;
  
      if (data?.statusCode === 200) {
        yield put(
          chartsSensorReducer.searchChartGetDataSuccess({
            statusCode: data?.statusCode,
            statusMessage: data?.statusMessage,
            message: data?.message,
            data :{
              listDataChartInfo: data.data.listDataChartInfo
            }
        }));
      } else {
        yield put(
          chartsSensorReducer.searchChartGetDataFalse({
            statusCode: data.data?.code || '400',
            message: data.data?.message || 'failed'
        }));
      }
    } catch (error) {
      yield put(
        chartsSensorReducer.errorConnectServerFalse({ 
          message:error }));
    }
  }

function* sensorSaga() {
  yield all([
    takeLatest(actionTypes.SENSOR_GET_DATA, getDataSensorLastest),
    takeLatest(actionTypes.SENSOR_CHANGE_DATA, changeDataSensorConfig),
    takeLatest(actionTypes.SEARCH_CHART_GET_DATA, chartGetListDataSensor)
  ]);
}

export default sensorSaga;
