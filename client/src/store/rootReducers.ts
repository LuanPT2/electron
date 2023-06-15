import { combineReducers } from 'redux';
import authReducer from 'pages/Authorization/redux/authReducer';
import sensorReducer from 'pages/Control/redux/sensorReducer';


const appReducer = combineReducers({
  authReducer,
  sensorReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;
