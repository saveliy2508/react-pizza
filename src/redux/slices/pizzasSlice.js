import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
	const { category, sortBy } = params
	const { data } = await axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${sortBy === 'алфавиту' ? 'name' : sortBy === 'популярности' ? 'rating' : 'price'}${category > 0 ? `&category=${category}` : ''}`)
	return data
})

const initialState = {
	items: [], renderItem: [], isLoaded: false
}

export const pizzasSlice = createSlice({
	name: 'pizzas', initialState, reducers: {
		setIsLoaded(state, action) {
			state.isLoaded = action.payload
		},
		
		setPizzas(state, action) {
			state.items = action.payload
			state.isLoaded = true
		},
		
		setRenderItem(state, action) {
			state.renderItem = state.items.filter((item) => item.name.toLowerCase().includes(action.payload.searchFilter.toLowerCase())).slice(action.payload.page * 4, action.payload.page * 4 + 4)
		}
	}, extraReducers: {
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
		}
	}
})

export const { setPizzas, setRenderItem } = pizzasSlice.actions

export default pizzasSlice.reducer