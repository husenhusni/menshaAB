import {SET_USER, SET_AUTHENTICATED,SET_UNAUTHENTICATED } from '../type';

const initialState={
    authenticated: false,
}
export default function userReducer(state = initialState, action) { 
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
            ...state,
            authenticated: true,
        }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            
            state={
                ...state,
                ...action.payLoad,
                authenticated: true,
            }
            return state 
        default:
            return state
    }
}