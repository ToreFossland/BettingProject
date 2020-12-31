import {
    USER_LOADED,
} from '../actions/types';

const initialState = {
    userId: null,
    username: null,
    gnomes: [],
    activeGnome: null
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                userId: action.payload.id,
                username: action.payload.username,
                gnomes: action.payload.gnomes,
                activeGnome: action.payload.id
            }
        default:
            return state;

    }
}