export type PizzaItem = {
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

export interface PizzasSliceState {
	items: PizzaItem[]
	renderItem: PizzaItem[]
	isLoaded: boolean
}
