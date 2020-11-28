import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    EXCHANGE_LOADING,
    EXCHANGE_LOADED,
    WALLET_LOADING,
    WALLET_LOADED,
    AUTH_ERROR
} from '../actions/types';
import { IExistingBet } from "../../types/interfaces"

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

        default:
            return state;
    }
}