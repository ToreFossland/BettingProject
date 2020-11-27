import {
    BOOKIE_LOADED,
    BOOKIE_LOADING,
    AUTH_ERROR
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    bookies: null,
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
        default:
            return state;
    }
}