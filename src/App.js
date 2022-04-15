import React from "react";
import {Routes, Route} from 'react-router-dom'

import s from './App.module.scss';

import Header from './components/Header/Header'
import Main from "./components/Main/Main";
import Cart from './components/Cart/Cart'

function App() {
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

export default App;