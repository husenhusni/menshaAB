import {LOADING_UI, SET_ERRORS} from "../type"
const initialState = {
    loginPhoneInput:"",
    isLoading:false,
    readingStorage:""
}

export default function uiReducer(state = initialState, action) {
    
    switch (action.type) {
        case SET_ERRORS:
            return{
                ...state,
                ...action.payLoad,
            }
        case LOADING_UI:
            return{
                ...state,
                ...action.payLoad
            }
        
        default:
            return state
    }
}