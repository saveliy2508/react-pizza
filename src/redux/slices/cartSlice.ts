import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
	parentId: number
	name: string
	price: number
	imageUrl: string
	activeType: number
	activeSize: number
	count: number
}

interface CartSliceState {
	cartItems: CartItem[]
	totalPrice: number
	totalItems: number
}

const initialState: CartSliceState = {
	cartItems: [],
	totalItems: 0,
	totalPrice: 0
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addPizzaCart(state, action: PayloadAction<CartItem>) {
			if (
				!state.cartItems.find(
					(item: CartItem) =>
						action.payload.parentId === item.parentId &&
						action.payload.activeType === item.activeType &&
						action.payload.activeSize === item.activeSize
				)
			) {
				state.cartItems = [...state.cartItems, action.payload]
				state.totalItems = state.totalItems + 1
				state.totalPrice = state.totalPrice + action.payload.price
			} else {
				state.cartItems[
					state.cartItems.indexOf(
						//@ts-ignore
						state.cartItems.find(
							(item: CartItem) =>
								action.payload.parentId === item.parentId &&
								action.payload.activeType === item.activeType &&
								action.payload.activeSize === item.activeSize
						)
					)
				].count++
				state.totalItems = state.totalItems + 1
				state.totalPrice = state.totalPrice + action.payload.price
			}
		},
		clearAllPizzas(state) {
			state.cartItems = []
			state.totalItems = 0
			state.totalPrice = 0
		},
		clearPizzas(state, action: PayloadAction<number>) {
			state.totalPrice =
				state.totalPrice -
				state.cartItems[action.payload].price *
					state.cartItems[action.payload].count
			state.totalItems =
				state.totalItems - state.cartItems[action.payload].count
			state.cartItems.splice(action.payload, 1)
		},
		incrementPizza(state, action: PayloadAction<number>) {
			state.cartItems[action.payload].count++
			state.totalItems = state.totalItems + 1
			state.totalPrice =
				state.totalPrice + state.cartItems[action.payload].price
		},
		decrementPizza(state, action: PayloadAction<number>) {
			if (state.cartItems[action.payload].count === 1) {
				state.totalPrice =
					state.totalPrice -
					state.cartItems[action.payload].price *
						state.cartItems[action.payload].count
				state.totalItems = state.totalItems - 1
				state.cartItems.splice(action.payload, 1)
			} else {
				state.cartItems[action.payload].count--
				state.totalItems = state.totalItems - 1
				state.totalPrice =
					state.totalPrice - state.cartItems[action.payload].price
			}
		}
	}
})

export const {
	addPizzaCart,
	clearAllPizzas,
	clearPizzas,
	incrementPizza,
	decrementPizza
} = cartSlice.actions

export default cartSlice.reducer
