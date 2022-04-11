import React from "react";

import s from './main.module.scss'

function Main(props) {
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
        </div>
    )
}

export default Main;