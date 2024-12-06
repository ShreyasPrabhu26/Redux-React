import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "../feautures/accounts/accountSlice";
import customerReducer from "../feautures/customer/customerSlice";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store; 