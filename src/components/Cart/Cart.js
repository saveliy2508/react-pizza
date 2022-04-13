import React from 'react';
import s from './cart.module.scss'

function Cart () {
    return (
        <div className={s.cartConteiner}>
            <div className={s.emptyCart}>
                <div className={s.title}>Корзина пустая <img src="./img/smile.svg" alt="smile" className={s.smile}/></div>
                <div className={s.text}>Вероятней всего, вы не заказывали ещё пиццу.
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                </div>
                <img className={s.cartImage} display='block' src='./img/emptyCart.jpg' />
                <div className={s.button}>Вернуться назад</div>
            </div>
        </div>
    );
};

export default Cart;
