import axios from 'axios';
import React, {useEffect} from "react";
import { returnErrors } from './errorActions';
import {
  BETS_LOADED,
  BETS_LOADING,
  AUTH_ERROR
} from './types';
import { IConfigHeaders, IBet, IBetActionTypes } from '../../types/interfaces';


// Check token & load user
export const loadBets = () => (dispatch: Function, getState: Function) => {
    // User loading
    dispatch({ type: BETS_LOADING });
        
        const fetchData = async () => {
            await axios.get('http://localhost:5000/bets/', tokenConfig(getState))
                .then(res =>
                    dispatch({
                    type: BETS_LOADED,
                    payload: res.data.map((bet : any) => {
                                const temp : IBet = {
                                id: bet._id,
                                userId: bet.userId,
                                placeDate: bet.placeDate,
                                betDate: bet.betDate,
                                event: bet.event,
                                backOdds: bet.backOdds,
                                layOdds: bet.layOdds,
                                backAmount: bet.backAmount,
                                layAmount: bet.layAmount,
                                bookie: bet.bookie,
                                exchange: bet.exchange,
                                commission: bet.commission,
                                sport: bet.sport,
                                freebet: bet.freebet,
                                outcome: bet.outcome
                            }
                            return temp;
                        })
                    })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
            type: AUTH_ERROR
            });
        });
    };
    fetchData();
}

    


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
  