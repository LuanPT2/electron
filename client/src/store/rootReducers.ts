import { combineReducers } from 'redux';
import authReducer from 'pages/Authorization/redux/authReducer';
import sensorReducer from 'pages/Control/redux/reducers/sensorReducer';
import chartsSensorReducer from 'pages/Control/redux/reducers/chartsSensorReducer';

const appReducer = combineReducers({
  authReducer,
  sensorReducer,
  chartsSensorReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;
