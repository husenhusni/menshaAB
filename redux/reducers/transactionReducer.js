import { SET_TRANSACTION, COMPLETE_TRANSACTION, SET_Qoute } from '../type';

const initialState = {
    country_reciever: "ETHIOPIA",
    status: "pending",
    transactionPaid: false,
    qouteSendAmount:0,
    qouteSendCurrency:undefined,
    qouteSendCountryCode:undefined,
    qouteReceiverCurrency:undefined,
    rate: 0,
    fee: 0,
}
export default function transactionReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case SET_TRANSACTION:
            
            if(action.payLoad===undefined){
                return initialState
            }
            else{
                return {
                    ...state,
                    ...action.payLoad,
                }
            }
        case COMPLETE_TRANSACTION:

            return {
                ...state,
                ...action.payLoad
            }
        case SET_Qoute:
            return{
                ...state,
                ...action.payLoad
            }

        default:
            return state
    }
}