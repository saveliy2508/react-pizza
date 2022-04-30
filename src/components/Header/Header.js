import React from "react";

import s from './header.module.scss'
import {NavLink} from 'react-router-dom'
import {useSelector} from "react-redux";

function Header(props) {
    const {totalPrice, totalItems} = useSelector(({cart}) => ({
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems,
    }))
    return (
        <header className={s.header}>
            <NavLink to='/main'>
                <div className={s.headerLeft}>
                    <img className={s.logo} src='./img/logo.svg' alt='logo'/>
                    <div className={s.title}>REACT PIZZA</div>
                    <div className={s.slogan}>самая вкусная пицца во вселенной</div>
                </div>
            </NavLink>
            <NavLink to='/cart'>
                <div className={s.headerRight}>
                    <div className={s.leftPart}>{totalPrice} ₽</div>
                    <div className={s.border}></div>
                    <div className={s.rightPart}><img className={s.cart} src="./img/cart.svg" alt="cart"/>{totalItems}</div>
                </div>
            </NavLink>
        </header>
    )
}

export default Header;