import { combineReducers } from 'redux';
import authReducer from 'pages/Authorization/redux/authReducer';


const appReducer = combineReducers({
  authReducer,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;
