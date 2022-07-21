import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaCart(state, action) {
      if (!state.items.find(item => action.payload.parentId == item.parentId && action.payload.activeType == item.activeType && action.payload.activeSize == item.activeSize)) {
        state.items = [...state.items, action.payload];
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
      } else {
        state.items[state.items.indexOf(state.items.find(item => action.payload.parentId == item.parentId && action.payload.activeType == item.activeType && action.payload.activeSize == item.activeSize))].count++;
        state.totalItems = state.totalItems + 1;
        state.totalPrice = state.totalPrice + action.payload.price;
      }
    },
    clearAllPizzas(state) {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    clearPizzas(state, action) {
      state.totalPrice = state.totalPrice - state.items[action.payload].price * state.items[action.payload].count;
      state.totalItems = state.totalItems - state.items[action.payload].count;
      state.items.splice(action.payload, 1);
    },
    incrementPizza(state, action) {
      state.items[action.payload].count++;
      state.totalItems = state.totalItems + 1;
      state.totalPrice = state.totalPrice + state.items[action.payload].price;
    },
    decrementPizza(state, action) {
      if (state.items[action.payload].count == 1) {
        state.totalPrice = state.totalPrice - state.items[action.payload].price * state.items[action.payload].count;
        state.totalItems = state.totalItems-1;
        state.items.splice(action.payload, 1);
      } else {
        state.items[action.payload].count--;
        state.totalItems = state.totalItems - 1;
        state.totalPrice = state.totalPrice - state.items[action.payload].price;
      }
    },
  }
})

export const {addPizzaCart, clearAllPizzas, clearPizzas, incrementPizza, decrementPizza} = cartSlice.actions;

export default cartSlice.reducer;