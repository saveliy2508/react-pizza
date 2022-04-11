import React from "react";

import s from './header.module.scss'

function Header(props) {
    return (
        <header className={s.header}>
            <div className={s.headerLeft}>
                <img className={s.logo} src='./img/logo.svg' alt='logo'/>
                <div className={s.title}>REACT PIZZA</div>
                <div className={s.slogan}>самая вкусная пицца во вселенной</div>
            </div>
            <div className={s.headerRight}>
                <div className={s.leftPart}>520 ₽</div>
                <div className={s.border}></div>
                <div className={s.rightPart}><img className={s.cart} src="./img/cart.svg" alt="cart"/>3</div>
            </div>
        </header>
    )
}

export default Header;