import {
  BETS_LOADED,
  BETS_LOADING,
  AUTH_ERROR,
  TODAYS_BETS_LOADED,
  FIXTURE_ERROR,
  TODAYS_BETS_SETTLED,
  CHECKING_TODAYS_BETS,
  SETTELING_OLD_BETS,
  SETTELD_OLD_BETS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  bets: [],
  todays_bets: [],
  settling_bets: false,
  settled_old_bets: false
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
    case TODAYS_BETS_LOADED:
      return {
        ...state,
        isLoading: false,
        todays_bets: action.payload
      };
    case CHECKING_TODAYS_BETS:
      return {
        ...state,
        settling_bets: true
      }
    case TODAYS_BETS_SETTLED:
      return {
        ...state,
        todays_bets: action.payload,
        settling_bets: false
      }
    case SETTELING_OLD_BETS:
      return {
        ...state,
        settling_bets: true
      }
    case SETTELD_OLD_BETS:
      return {
        ...state,
        settled_old_bets: true,
        settling_bets: false
      }
    case FIXTURE_ERROR:
      return {
        ...state,
        settling_bets: false
      }
    default:
      return state;
  }
}