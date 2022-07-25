import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params) => {
    const {category, page, sortBy} = params;
    const {data} = await axios.get(
      `https://6242deadd126926d0c58b871.mockapi.io/items?page=${page}&limit=4&sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category && `&category=${category}`}`
    );
    return data;
  }
)

export const fetchPizzasWithoutPages = createAsyncThunk(
  'pizzas/fetchPizzasWithoutPages',
  async (params) => {
    const {category, sortBy} = params;
    const {data} = await axios.get(
      `https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category && `&category=${category}`}`
    );
    return data;
  }
)

const initialState = {
  items: [],
  itemsWithoutPage: [],
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
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = []
      state.isLoaded = false
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.isLoaded = true
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = []
      state.isLoaded = false
    },
    [fetchPizzasWithoutPages.pending]: (state) => {
      state.itemsWithoutPage = []
      state.isLoaded = false
    },
    [fetchPizzasWithoutPages.fulfilled]: (state, action) => {
      state.itemsWithoutPage = action.payload
      state.isLoaded = true
    },
    [fetchPizzasWithoutPages.rejected]: (state) => {
      state.itemsWithoutPage = []
      state.isLoaded = false
    },
  }
})

export const {setPizzas, setIsLoaded} = pizzasSlice.actions;

export default pizzasSlice.reducer;