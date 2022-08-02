import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { PizzaItem } from './types'

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
