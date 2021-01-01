import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    EXCHANGE_LOADING,
    EXCHANGE_LOADED,
    WALLET_LOADING,
    WALLET_LOADED,
    AUTH_ERROR,
    BANK_ERROR,
} from './types';
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

    const activeGnome = getState().user.activeGnome
    if (activeGnome) {
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
    }
};

export async function updateBookieBalance(dispatch: Function, bet: any) {
    if (bet.didWin) {
        await axios.post('http://localhost:5000/bookies/bet-won', {
            params: {
                id: bet.gnomeId,
                name: bet.bookie,
                backAmount: bet.backAmount,
                backOdds: bet.backOdds,
                freebet: bet.freebet
            }
        })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: BANK_ERROR
                });
            })
    }
    else {
        await axios.post('http://localhost:5000/bookies/bet-lost', {
            params: {
                id: bet.gnomeId,
                name: bet.bookie,
                backAmount: bet.backAmount,
                freebet: bet.freebet
            }
        })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: BANK_ERROR
                });
            })
    }
}

export async function updateExchangeBalance(dispatch: Function, bet: any) {
    if (!bet.didWin) {
        await axios.post('http://localhost:5000/exchanges/bet-won', {
            params: {
                id: bet.userId,
                name: bet.exchange,
                layAmount: bet.layAmount,
                layOdds: bet.layOdds,
                backAmount: bet.backAmount
            }
        })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: BANK_ERROR
                });
            })
    }
    else {
        await axios.post('http://localhost:5000/exchanges/bet-lost', {
            params: {
                id: bet.userId,
                name: bet.exchange,
                layAmount: bet.layAmount,
                layOdds: bet.layOdds
            }
        })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: BANK_ERROR
                });
            })
    }
}
