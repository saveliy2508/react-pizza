import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type PizzaItem = {
	category: number
	imageUrl: string
	name: string
	parentId: number
	price: number
	rating: number
	sizes: [number]
	types: [number]
	onAddCartItem?: Function
}

interface PizzasSliceState {
	items: PizzaItem[]
	renderItem: PizzaItem[]
	isLoaded: boolean
}

const initialState: PizzasSliceState = {
	items: [],
	renderItem: [],
	isLoaded: false
}

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async (params: { category: number; sortBy: string }) => {
		const { category, sortBy } = params
		const { data } = await axios.get(
			`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${
				sortBy === 'алфавиту'
					? 'name'
					: sortBy === 'популярности'
					? 'rating'
					: 'price'
			}${category > 0 ? `&category=${category}` : ''}`
		)
		return data as PizzaItem[]
	}
)

export const pizzasSlice = createSlice({
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

export const { setPizzas, setRenderItem } = pizzasSlice.actions

export default pizzasSlice.reducer
