export type CartItem = {
	parentId: number
	name: string
	price: number
	imageUrl: string
	activeType: number
	activeSize: number
	count: number
}

export interface CartSliceState {
	cartItems: CartItem[]
	totalPrice: number
	totalItems: number
}
