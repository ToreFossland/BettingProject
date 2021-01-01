import { stat } from 'fs';
import {
    USER_LOADED, USER_LOADING,
} from '../actions/types';

const initialState = {
    userId: null,
    username: null,
    gnomes: [],
    activeGnome: null,
    isLoading: false
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                userId: action.payload.id,
                username: action.payload.username,
                gnomes: action.payload.gnomes,
                activeGnome: action.payload.id,
                isLoading: false
            }
        default:
            return state;

    }
}