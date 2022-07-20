import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortBy: 'популярности',
  page: 1,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
  }
})

export const {setCategory, setSortBy, setPage} = filterSlice.actions;

export default filterSlice.reducer;