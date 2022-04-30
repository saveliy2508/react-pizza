import {combineReducers} from "redux";
import filterReducer from './filters'
import pizzaReducer from './pizzas'
import cartReducer from "./cart";

const rootReducer = combineReducers({
    filter: filterReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
})

export default rootReducer;