import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    EXCHANGE_LOADING,
    EXCHANGE_LOADED,
    WALLET_LOADING,
    WALLET_LOADED,
    AUTH_ERROR,
    BOOKIE_UPDATED,
    BANK_ERROR,
    EXCHANGE_UPDATED
} from '../actions/types';
import { IExistingBet, IExistingBookie, IExistingExchange } from "../../types/interfaces"

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    bookies: [],
    exchanges: [],
    wallets: []
};



export default function (state = initialState, action: any) {
    switch (action.type) {
        case AUTH_ERROR:
        case BOOKIE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case BOOKIE_LOADED:
            return {
                ...state,
                isLoading: false,
                bookies: action.payload
            };
        case BOOKIE_UPDATED:
            return {
                ...state,
                bookies: state.bookies.map((bookie: IExistingBookie) =>
                    (bookie.name === action.payload.name) ? action.payload : bookie)
            }
        case EXCHANGE_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case EXCHANGE_LOADED:
            return {
                ...state,
                isLoading: false,
                exchanges: action.payload
            };
        case EXCHANGE_UPDATED:
            return {
                ...state,
                exchanges: state.exchanges.map((exchange: IExistingExchange) =>
                    (exchange.name === action.payload.name) ? action.payload : exchange)
            }
        case WALLET_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case WALLET_LOADED:
            return {
                ...state,
                isLoading: false,
                wallets: action.payload
            };

        case BANK_ERROR:
            return {
                ...state
            }
        default:
            return state;
    }
}