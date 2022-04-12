import React from "react";

import s from './pizza.module.scss'

function Pizza(props) {
    return (
        <div className={s.pizza}>
            <img display='block' className={s.image} src={props.image}></img>
            <div className={s.title}>{props.name}</div>
            <div className={s.settings}>
                <div className={s.dough}>
                    <div>тонкое</div>
                    <div>традиционное</div>
                </div>
                <div className={s.size}>
                    <div>26 см.</div>
                    <div>30 см.</div>
                    <div>40 см.</div>
                </div>
            </div>
            <div className={s.footer}>
                <div className={s.price}>от {props.price} ₽</div>
                <div className={s.addButton}><img src="./img/plusOrange.svg" alt=""/>Добавить</div>
            </div>
        </div>
    )
}

export default Pizza;