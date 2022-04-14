import React, {useEffect} from "react";
import Pizza from "./Pizza/Pizza"
import axios from "axios";

import s from './main.module.scss'
import {useState} from "react";

function Main(props) {
    const [pizzas, setPizzas] = useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:3000/db.json').then((resp) => setPizzas(resp.data.pizzas))
    }, []);

    let sortingButton = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые']

    let subMenu = ['популярности', 'цене', 'алфавиту']

    const [isActiveSort, setIsActiveSort] = useState(0);

    let onSortButton = (index) => {
        setIsActiveSort(index)
    }

    const [isSubMenu, setIsSubMenu] = useState(false);

    let toggleSubMenu = () => {
        setIsSubMenu(!isSubMenu)
    }

    const [isActiveSubMenu, setIsActiveSubMenu] = useState(0);

    let onActiveSubMenu = (index) => {
        setIsActiveSubMenu(index)
        setIsSubMenu(false)
    }

    const sortRef = React.useRef();

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {
            setIsSubMenu(false)
        }
    }

    React.useEffect(() => {
        return () => {
            document.body.addEventListener('click', handleOutsideClick)
        };
    }, []);


    return (
        <div className={s.main}>
            <div className={s.sorting}>
                <div className={s.sortingLeft}>
                    {sortingButton.map((item, index) => (
                        <div key={`Btn${index}`} className={isActiveSort === index ? s.active : null}
                             onClick={() => onSortButton(index)}>{item}</div>
                    ))}
                </div>
                <div className={s.sortingRight} ref={sortRef}>
                    <div className={s.menu} onClick={toggleSubMenu}>
                        <img src='./img/arrowTop.svg' alt="arrow"/>
                        <p>Сортировка по:</p>
                        <p><span>{subMenu[isActiveSubMenu]}</span></p>
                    </div>
                    {isSubMenu ? <div className={s.subMenu}>
                        <div className={s.features}>
                            {subMenu.map((item, index) => (
                                <p onClick={() => onActiveSubMenu(index)} key={'subMenuItem' + index}
                                   className={isActiveSubMenu == index ? s.activeSubItem : null}>{item}</p>
                            ))}
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
                        imageUrl={item.imageUrl}
                        types={item.types}
                        sizes={item.sizes}
                    />
                ))}
            </div>
        </div>
    )
}


export default Main;