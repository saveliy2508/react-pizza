import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	category: 0, sortBy: 'популярности', page: 1, searchFilter: ''
}

export const filterSlice = createSlice({
	name: 'filters', initialState, reducers: {
		setCategory(state, action) {
			state.category = action.payload
		},
		
		setSortBy(state, action) {
			state.sortBy = action.payload
		},
		
		setPage(state, action) {
			state.page = action.payload
		},
		
		setFilters(state, action) {
			state.sortBy = action.payload.sortBy
			state.category = Number(action.payload.category)
			state.page = Number(action.payload.page)
		},
		
		setSearchFilter(state, action) {
			state.searchFilter = action.payload
			state.page = 0
		}
	}
})

export const { setCategory, setSortBy, setPage, setFilters, setSearchFilter } = filterSlice.actions

export default filterSlice.reducer