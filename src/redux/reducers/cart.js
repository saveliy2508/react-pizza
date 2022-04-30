const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
}

const cart = (state = initialState, action) => {
    if(action.type === 'ADD_PIZZA_CART'){
        return {
            ...state,
            items: [...state.items, action.payload],
            totalItems: state.totalItems+1,
            totalPrice: state.items.reduce((sum, obj) => obj.price + sum, 0)
        };
    } else if (1<0) {
        console.log('test')
    }
    return state;
}

export default cart;