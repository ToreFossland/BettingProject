import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  BETS_LOADED,
  BETS_LOADING,
  AUTH_ERROR
} from './types';
import { IConfigHeaders } from '../../types/interfaces';


// Check token & load user
export const loadBets = () => (dispatch: Function, getState: Function) => {
    // User loading
    dispatch({ type: BETS_LOADING });
  
    axios
      .get('http://localhost:5000/bets/', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: BETS_LOADED,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR
        });
      });
  };


  // Setup config/headers and token
export const tokenConfig = (getState: Function) => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config: IConfigHeaders = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };
  