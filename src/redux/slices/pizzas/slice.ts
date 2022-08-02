import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPizzas } from './asyncActions'
import { PizzaItem, PizzasSliceState } from './types'

const initialState: PizzasSliceState = {
	items: [],
	renderItem: [],
	isLoaded: false
}

export const slice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setIsLoaded(state, action: PayloadAction<boolean>) {
			state.isLoaded = action.payload
		},

		setPizzas(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload
			state.isLoaded = true
		},

		setRenderItem(
			state,
			action: PayloadAction<{ searchFilter: string; page: number }>
		) {
			state.renderItem = state.items
				.filter((item: { name: string }) =>
					item.name
						.toLowerCase()
						.includes(action.payload.searchFilter.toLowerCase())
				)
				.slice(action.payload.page * 4, action.payload.page * 4 + 4)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = []
			state.isLoaded = false
		})
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload
			state.isLoaded = true
		})
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.items = []
			state.isLoaded = false
		})
	}
	// ЕСЛИ БЕЗ TYPESCRIPT
	//
	// 	{[fetchPizzas.pending]: (state) => {
	// 		state.items = []
	// 		state.isLoaded = false
	// 	},
	//
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload
	// 		state.isLoaded = true
	// 	},
	//
	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.items = []
	// 		state.isLoaded = false
	// 	}
	// }
})

export const { setPizzas, setRenderItem } = slice.actions

export default slice.reducer
