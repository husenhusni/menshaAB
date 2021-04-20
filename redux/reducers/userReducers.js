import {SET_USER, SET_AUTHENTICATED,SET_UNAUTHENTICATED } from '../type';

const initialState={
    authenticated: false,
    userDetail:{},
}
export default function userReducer(state = initialState, action) { 
    console.log(action);
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
                ...action.payLoad,
                authenticated: true,
            }
            console.log(state);
            return state 
        default:
            return state
    }
}