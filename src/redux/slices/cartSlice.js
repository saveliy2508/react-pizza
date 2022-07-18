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
      state.items = [...state.items, action.payload];
      state.totalItems = state.totalItems + 1;
      state.totalPrice = state.items.reduce((sum, obj) => obj.price + sum, 0)
    }
  }
})

export const {addPizzaCart} = cartSlice.actions;

export default cartSlice.reducer;