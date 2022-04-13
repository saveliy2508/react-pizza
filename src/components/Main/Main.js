import React from "react";
import Pizza from "./Pizza/Pizza"

import s from './main.module.scss'
import {useState} from "react";

function Main(props) {
    let pizzas = [
        {parentId: 1, name: 'Чизбургер - пицца', image: './img/1.jpg', price: 395},
        {parentId: 2, name: 'Креветки по-азиатски', image: './img/2.jpg', price: 450},
        {parentId: 3, name: 'Сырная', image: './img/3.jpg', price: 290},
        {parentId: 4, name: 'Сырный цыпленок', image: './img/4.jpg', price: 385},
        {parentId: 5, name: 'Чизбургер - пицца', image: './img/5.jpg', price: 395},
        {parentId: 6, name: 'Креветки по-азиатски', image: './img/6.jpg', price: 395},
        {parentId: 7, name: 'Сырная', image: './img/7.jpg', price: 395},
        {parentId: 8, name: 'Сырный цыпленок', image: './img/8.jpg', price: 395},
    ]

    let sortingButton = [{name: 'Все'}, {name: 'Мясные'}, {name: 'Вегетарианская'}, {name: 'Гриль'}, {name: 'Острые'}]

    const [isActiveSort, setIsActiveSort] = useState(0);

    let onSortButton = (index) => {
        setIsActiveSort(index)
    }

    const [isSubMenu, setIsSubMenu] = useState(false);

    return (
        <div className={s.main}>
            <div className={s.sorting}>
                <div className={s.sortingLeft}>
                    {sortingButton.map((item, index) => (
                        <div key={`Btn${index}`} className={isActiveSort === index ? s.active : null}
                             onClick={() => onSortButton(index)}>{item.name}</div>
                    ))}
                </div>
                <div className={s.sortingRight}>
                    <div className={s.menu} onClick={() => setIsSubMenu(!isSubMenu)}>
                        <img src='./img/arrowTop.svg' alt="arrow"/>
                        <p>Сортировка по:</p>
                        <p><span>популярности</span></p>
                    </div>
                    {isSubMenu ? <div className={s.subMenu}>
                        <div className={s.features}>
                            <p className={s.item}>популярности</p>
                            <p className={s.item}>по цене</p>
                            <p className={s.item}>по алфавиту</p>
                        </div>
                    </div> : null}
                </div>
            </div>
            <div className={s.pizzasTitle}>Все пиццы</div>
            <div className={s.pizzas}>
                {pizzas.map((item, index) => (
                    <Pizza
                        key={`${item.name}${index}`}
                        parentId={item.parentId}
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