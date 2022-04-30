import React from 'react';
import s from './cartItem.module.scss'

const CartItem = (props) => {
    console.log(props)
    return (
        <div className={s.cartItem}>
            <div className={s.cartItemLeft}>
                <img src={props.imageUrl} alt="пицца"/>
                <div className={s.description}>
                    <p className={s.name}>{props.name}</p>
                    <p className={s.type}>{props.activeType == 0 ? 'тонкое тесто' : 'традиционное тесто'}, {props.activeSize == 0 ? '26' : props.activeSize == 1 ? '30' : '40'} см</p>
                </div>
            </div>
            <div className={s.cartItemRight}>
                <div className={s.count}>
                    <button>+</button>
                    <p>2</p>
                    <button>-</button>
                </div>
                <div>
                    <p className={s.price}>499<span>Р</span></p>
                </div>
                <button className={s.delete}>+</button>
            </div>
        </div>
    );
};

export default CartItem;
