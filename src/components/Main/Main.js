// import React from "react";
import Pizza from "./Pizza/Pizza"

import s from './main.module.scss'

function Main(props) {
    let pizzas = [
        {id: 1, name: 'Чизбургер - пицца', image: './img/1.jpg', price: 395},
        {id: 2, name: 'Сырная', image: './img/2.jpg', price: 450},
        {id: 3, name: 'Креветки по-азиатски', image: './img/3.jpg', price: 290},
        {id: 4, name: 'Сырный цыпленок', image: './img/4.jpg', price: 385},
        {id: 5, name: 'Чизбургер - пицца', image: './img/5.jpg', price: 395},
        {id: 6, name: 'Сырная', image: './img/6.jpg', price: 395},
        {id: 7, name: 'Креветки по-азиатски', image: './img/7.jpg', price: 395},
        {id: 8, name: 'Сырный цыпленок', image: './img/8.jpg', price: 395},
    ]
    return (
        <div className={s.main}>
            <div className={s.sorting}>
                <div className={s.sortingLeft}>
                    <div className={s.sortingButton}>
                        Все
                    </div>
                    <div className={s.sortingButton}>
                        Мясные
                    </div>
                    <div className={s.sortingButton}>
                        Вегетарианская
                    </div>
                    <div className={s.sortingButton}>
                        Гриль
                    </div>
                    <div className={s.sortingButton}>
                        Острые
                    </div>
                    <div className={s.sortingButton}>
                        Закрытые
                    </div>
                </div>
                <div className={s.sortingRight}>
                    <div className={s.menu}>
                        <img src='./img/arrowTop.svg' alt="arrow"/>
                        <p>Сортировка по:</p>
                        <p><span>популярности</span></p>
                    </div>
                    <div className={s.subMenu}>
                        <div className={s.features}>
                            <p className={s.item}>популярности</p>
                            <p className={s.item}>по цене</p>
                            <p className={s.item}>по алфавиту</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.pizzasTitle}>Все пиццы</div>
            <div className={s.pizzas}>
                {pizzas.map((item, index) => (
                    <Pizza
                        key={index}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default Main;