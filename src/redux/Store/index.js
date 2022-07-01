import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers";

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware());
}