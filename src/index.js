import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App';

import {store} from './redux/store'
import axios from "axios";
import {setPizzas} from "./redux/slices/pizzasSlice";
import {Context} from "./context";

const fetch = (sortBy, category, page, dispatch) => {
  axios.get(
    `https://6242deadd126926d0c58b871.mockapi.io/items?page=${page}&limit=4&sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category ? `&category=${category - 1}` : ''}`
  ).then(({data}) => {
    dispatch(setPizzas(data))
  })
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Context.Provider value={{fetch}}>
      <Provider store={store}>
        <App/>
      </Provider>
    </Context.Provider>
  </BrowserRouter>
);
