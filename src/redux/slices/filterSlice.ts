import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum SortByTypes {
	POPULAR = 'популярности',
	PRICE = 'цене',
	ALPHABET = 'алфавиту'
}

interface FilterSliceState {
	category: number
	sortBy: SortByTypes
	page: number
	searchFilter: string
}

const initialState: FilterSliceState = {
	category: 0,
	sortBy: SortByTypes.POPULAR,
	page: 1,
	searchFilter: ''
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategory(state, action: PayloadAction<number>) {
			state.category = action.payload
		},

		setSortBy(state, action: PayloadAction<SortByTypes>) {
			state.sortBy = action.payload
		},

		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},

		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.sortBy = action.payload.sortBy
			state.category = Number(action.payload.category)
			state.page = Number(action.payload.page)
		},

		setSearchFilter(state, action: PayloadAction<string>) {
			state.searchFilter = action.payload
			state.page = 0
		}
	}
})

export const { setCategory, setSortBy, setPage, setFilters, setSearchFilter } =
	filterSlice.actions

export default filterSlice.reducer
