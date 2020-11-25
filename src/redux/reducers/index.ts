
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import betReducer from './betReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  bet: betReducer
});