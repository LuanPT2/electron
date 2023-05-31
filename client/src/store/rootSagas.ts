import { all } from 'redux-saga/effects';


import authSaga from 'pages/Authorization/sagas/authSaga';


export default function* RootSagas() {
  yield all([
    authSaga(),
  ]);
}
