export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')
	return data
		? JSON.parse(data)
		: {
				cartItems: [],
				totalItems: 0,
				totalPrice: 0
		  }
}
