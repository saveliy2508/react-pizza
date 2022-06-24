import axios from "axios";


export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items
});


export const fetchPizzas = (sortBy, category) => dispatch => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  })
  axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category ? `&category=${category - 1}` : ''}`
  ).then(({data}) => {
    dispatch(setPizzas(data))
  })
}