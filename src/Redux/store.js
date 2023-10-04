import { auth_reducer } from "./Auth/auth.reducer";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";



const root_reducer = combineReducers({
    auth: auth_reducer
})

export const store = legacy_createStore(root_reducer, applyMiddleware(thunk))