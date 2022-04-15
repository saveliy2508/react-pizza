import React from "react";
import {Routes, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import store from './redux/store'
import {setPizzas} from './redux/actions/pizzas'

import s from './App.module.scss';

import Header from './components/Header/Header'
import Main from "./components/Main/Main";
import Cart from './components/Cart/Cart'
import axios from "axios";


class App extends React.Component {
    componentDidMount() {
        axios.get('http://localhost:3000/db.json').then(({data}) => {
            store.dispatch(setPizzas(data.pizzas))
        })
    }

    render() {
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
        )
    }
}


// function App() {
//     return (
//         <div className={s.App}>
//             <div className={s.wrapper}>
//                 <Header/>
//                 <Routes>
//                     <Route path='/main' element={<Main/>}/>
//                     <Route path='/cart' element={<Cart/>}/>
//                 </Routes>
//             </div>
//         </div>
//     );
// }

let mapStateToProps = (state) => {
    return{
        items: state.pizzas.items
    }

}

let mapDispatchToProps = () => {

}

export default App;