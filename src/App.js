import React from "react";
import {Routes, Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setPizzas} from './redux/actions/pizzas'
import axios from "axios";

import s from './App.module.scss';

import Header from './components/Header/Header'
import Main from "./components/Main/Main";
import Cart from './components/Cart/Cart'


function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        axios.get('https://6242deadd126926d0c58b871.mockapi.io/items').then(({data}) => {
            dispatch(setPizzas(data))
        })
    }, [])
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