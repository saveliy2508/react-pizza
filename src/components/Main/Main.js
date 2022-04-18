import React from "react";

import s from './main.module.scss'

import Pizza from "./Pizza/Pizza"
import {useDispatch, useSelector} from "react-redux";
import {setCategory} from './../../redux/actions/filters'

function Main(props) {
    const dispatch = useDispatch();
    const {items} = useSelector(({pizza}) => {
        return {
            items: pizza.items,
        }
    });

    const sortingButton = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые']

    const subMenu = [
        {name: 'популярности', type: 'popular'},
        {name: 'цена', type: 'price'},
        {name: 'алфавиту', type: 'alphabet'}
    ]

    const [isActiveSort, setIsActiveSort] = React.useState(0);

    const onSortButton = (index) => {
        setIsActiveSort(index)
        dispatch(setCategory(index))
    }

    const [isSubMenu, setIsSubMenu] = React.useState(false);

    const toggleSubMenu = () => {
        setIsSubMenu(!isSubMenu)
    }

    const [isActiveSubMenu, setIsActiveSubMenu] = React.useState(0);

    const onActiveSubMenu = (index) => {
        setIsActiveSubMenu(index)
        setIsSubMenu(false)
    }

    const sortRef = React.useRef();

    const handleOutsideClick = (e) => {
        if (!e.path.includes(sortRef.current)) {
            setIsSubMenu(false)
        }
    }
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
                        <p><span>{subMenu[isActiveSubMenu].name}</span></p>
                    </div>
                    {isSubMenu ? <div className={s.subMenu}>
                        <div className={s.features}>
                            {subMenu.map((item, index) => (
                                <p onClick={() => onActiveSubMenu(index)} key={'subMenuItem' + index}
                                   className={isActiveSubMenu == index ? s.activeSubItem : null}>{item.name}</p>
                            ))}
                        </div>
                    </div> : null}
                </div>
            </div>
            <div className={s.pizzasTitle}>Все пиццы</div>
            <div className={s.pizzas}>
                {items.map((item, index) => (
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