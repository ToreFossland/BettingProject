import {
    BETS_LOADED,
    BETS_LOADING,
    AUTH_ERROR
  } from '../actions/types';

  import{IBet, IBetActionTypes} from '../../types/interfaces'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    bets: [] as IBet[],
  };



export default function (state = initialState, action: any){
    switch (action.type) {
      case BETS_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case BETS_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          bets: action.payload
        };
         default:
            return state;
    }
}