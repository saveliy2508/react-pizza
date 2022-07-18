import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoaded: false
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setIsLoaded(state, action) {
      state.isLoaded = action.payload
    },
    setPizzas(state, action) {
      state.items = action.payload;
      state.isLoaded = true
    },
  }
})

export const {setPizzas, setIsLoaded} = pizzasSlice.actions;

export default pizzasSlice.reducer;