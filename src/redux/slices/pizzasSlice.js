import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// const fetchPizzas = createAsyncThunk(
//   'pizzas/fetchPizzasStatus',
//   async () => {
//     const {data} = await axios.get(
//       `https://6242deadd126926d0c58b871.mockapi.io/items?page=${page}&limit=4&sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category ? `&category=${category - 1}` : ''}`
//     );
//     return data;
//   })

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