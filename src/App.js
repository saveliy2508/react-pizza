import React from "react";
import {Routes, Route} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import s from './App.module.scss';

import Header from './components/Header'
import Main from "./components/Main";
import Cart from './components/Cart'
import axios from "axios";
import {setPizzas} from "./redux/slices/pizzasSlice";


function App() {
  const dispatch = useDispatch();
  
  const {category, sortBy} = useSelector(({filterSlice}) => filterSlice);
  
  // React.useEffect(() => {
  //   axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=
  // ${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}
  // ${category ? `&category=${category - 1}` : ''}`
  //   ).then(({data}) => {
  //     dispatch(setPizzas(data))
  //   })
  // }, [])
  
  return (
    <div className={s.App}>
      <div className={s.wrapper}>
        <Header/>
        <Routes>
          <Route path='/main' element={<Main/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default (App);