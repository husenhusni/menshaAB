import axios from 'axios';
import transactionReducer from '../reducers/transactionReducer';
import {SET_TRANSACTION, UPLOAD_TRANSACTION} from '../type';



export const sendingTranscationOrder = (transactionOrder) => dispatch =>{  
        dispatch({type: SET_TRANSACTION,
        payLoad: transactionOrder });
}
export const uploadTranscationOrder = (transactionOrder) => dispatch =>{ 
    
    axios.post('/user/home',transactionOrder).then(result =>{
        console.log(transactionOrder);
        dispatch({
            type: UPLOAD_TRANSACTION,
            payLoad: transactionOrder
        })
    }).catch(error=>{
        console.log(error);
    }) 
    
}