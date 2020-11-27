
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import betReducer from './betReducer';
import bankReducer from "./bankReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  bet: betReducer,
  bank: bankReducer
});

export type RootState = ReturnType<typeof rootReducer>;