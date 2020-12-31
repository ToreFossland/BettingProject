
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import betReducer from './betReducer';
import bankReducer from "./bankReducer"
import gnomeReducer from "./gnomeReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  user: gnomeReducer,
  error: errorReducer,
  bet: betReducer,
  bank: bankReducer
});

export type RootState = ReturnType<typeof rootReducer>;