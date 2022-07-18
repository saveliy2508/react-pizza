// import {createStore, compose, applyMiddleware} from "redux";
// import rootReducer from './reducers/index'
// import thunk from 'redux-thunk'
//
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//
// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))
//
// export default store;

import {configureStore} from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice
  }
})