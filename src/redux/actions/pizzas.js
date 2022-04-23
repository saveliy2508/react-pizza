import axios from "axios";

export const fetchPizzas = (sortBy, category) => dispatch => {
    dispatch({
        type: 'SET_LOADED',
        payload: false,
    })
    axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${sortBy == 'алфавит' ? 'name' : sortBy == 'популярность' ? 'rating' : 'price'}`
    ).then(({data}) => {
        dispatch(setPizzas(data))
    })
}

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items
});
