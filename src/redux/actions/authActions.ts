import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';

// Check token & load user
export const loadUser = () => (dispatch: Function, getState: Function) => {
  // User loading
  dispatch({ type: USER_LOADING });
  axios.get('http://localhost:5000/users/', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
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

// Register User
export const register = ({ username, email, password, passwordCheck }: IAuthFunction) => (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ username, email, password, passwordCheck });

  axios
    .post('http://localhost:5000/users/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      axios.get('http://localhost:5000/users/', { headers: { 'x-auth-token': res.data.token } })
        .then(res =>
          dispatch({
            type: USER_LOADED,
            payload: res.data
          })
        )
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => (
  dispatch: Function
) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ user: email, password });

  axios
    .post('http://localhost:5000/users/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      axios.get('http://localhost:5000/users/', { headers: { 'x-auth-token': res.data.token } })
        .then(res =>
          dispatch({
            type: USER_LOADED,
            payload: res.data
          })
        )
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
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

