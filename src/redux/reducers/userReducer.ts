import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    user: null
};

export default function (state = initialState, action: any) {
    switch (action.types) {
        case LOGIN_SUCCESS:
            return {
                ...state
            }
        default:
            return state;

    }
}