import axios from 'axios';
import React, { useEffect } from "react";
import { returnErrors } from './errorActions';
import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    EXCHANGE_LOADING,
    EXCHANGE_LOADED,
    WALLET_LOADING,
    WALLET_LOADED,
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

export const loadExchanges = () => (dispatch: Function, getState: Function) => {
    // Exchange loading
    dispatch({ type: EXCHANGE_LOADING });

    axios
        .get('http://localhost:5000/exchanges/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: EXCHANGE_LOADED,
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

export const loadWallets = () => (dispatch: Function, getState: Function) => {
    // Wallets loading
    dispatch({ type: WALLET_LOADING });

    axios
        .get('http://localhost:5000/wallets/', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: WALLET_LOADED,
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


