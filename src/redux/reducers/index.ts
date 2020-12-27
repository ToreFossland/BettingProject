
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import betReducer from './betReducer';
import bankReducer from "./bankReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  bet: betReducer,
  bank: bankReducer
});

export type RootState = ReturnType<typeof rootReducer>;