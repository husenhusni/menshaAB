import {SET_TRANSACTION, UPLOAD_TRANSACTION } from '../type';

const initialState={
    first_name:"",
    last_name:"",
    amount : '',
    bank_account : '',
    bank_name:'',
    city:"",
    region:"",
    country:"",
    phone_number:"",
    transactionUploaded: false
}
export default function transactionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRANSACTION:
            return {
            ...action.payLoad,
        }
        case UPLOAD_TRANSACTION:
            return {
                ...action.payLoad,
                transactionUploaded:true
            }

        default:
            return state
    }
}