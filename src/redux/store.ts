import { configureStore } from '@reduxjs/toolkit'

import filterSlice from './slices/filter/slice'
import cartSlice from './slices/cart/slice'
import pizzasSlice from './slices/pizzas/slice'

export const store = configureStore({
	reducer: {
		filterSlice,
		cartSlice,
		pizzasSlice
	}
})

// получение типа всего хранилища
export type RootState = ReturnType<typeof store.getState>
