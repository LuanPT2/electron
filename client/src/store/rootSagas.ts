import { all } from 'redux-saga/effects';

import authSaga from 'pages/Authorization/sagas/authSaga';
import sensorSaga from 'pages/Control/sagas/sensorSaga';


export default function* RootSagas() {
  yield all([
    authSaga(),
    sensorSaga(),
  ]);
}
