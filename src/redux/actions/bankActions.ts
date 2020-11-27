import axios from 'axios';
import React, { useEffect } from "react";
import { returnErrors } from './errorActions';
import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    AUTH_ERROR
} from './types';
import { IConfigHeaders } from '../../types/interfaces';
import { tokenConfig } from "./authActions"

// Check token & load user
export const loadBookies = () => (dispatch: Function, getState: Function) => {
    // Bet loading
    dispatch({ type: BOOKIE_LOADING });

    axios
        .get('http://localhost:5000/bookies/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: BOOKIE_LOADED,
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

