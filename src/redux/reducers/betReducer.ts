import {
  BETS_LOADED,
  BETS_LOADING,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  bets: null,
};



export default function (state = initialState, action: any) {
  switch (action.type) {
    case AUTH_ERROR:
    case BETS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case BETS_LOADED:
      return {
        ...state,
        isLoading: false,
        bets: action.payload
      };
    default:
      return state;
  }
}