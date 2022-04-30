export const setPizzaCart = (newItem) => ({
    type: 'ADD_PIZZA_CART',
    payload: {parentId: newItem.parentId, name: newItem.name, price: newItem.price, imageUrl: newItem.imageUrl, activeType: newItem.activeType, activeSize: newItem.activeSize}
});