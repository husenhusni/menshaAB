import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducers'
import transactionReducer from './reducers/transactionReducer'
import uiReducer from './reducers/uiReducer'
const initialState = {};
const middleware = [thunk];
const combineReducer = combineReducers({
    user: userReducer, 
    transaction: transactionReducer,
    ui:uiReducer
})

const store = createStore(combineReducer,initialState,compose(applyMiddleware( ...middleware)));

export default store;