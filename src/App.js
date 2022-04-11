import React from "react";

import s from './App.module.scss';

import Header from './components/Header/Header'
import Main from "./components/Main/Main";

function App(props) {
    return (
        <div className={s.App}>
            <div className={s.wrapper}>
                <Header/>
                <Main />
                лул
            </div>
        </div>
    );
}

export default App;
