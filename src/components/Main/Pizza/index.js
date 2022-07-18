import React from "react";
import classNames from "classnames";

import s from './pizza.module.scss'

function Index(props) {
    const typeNames = ['тонкое', 'традиционное'];
    const size = [26, 30, 40];

    const [activeType, setActiveType] = React.useState(props.types[0]);
    const onSelectType = (index) => {
        setActiveType(index)
    }
    const [activeSize, setActiveSize] = React.useState(props.sizes[0] == 26 ? 0 : props.sizes[0] == 30 ? 1 : 2);
    const onSelectSize = (index) => {
        setActiveSize(index)
    }

    const cartData = {
        ...props, activeType: activeType, activeSize: activeSize
    }

    return (
        <div className={s.pizza}>
            <img display='block' className={s.image} src={props.imageUrl}></img>
            <div className={s.title}>{props.name}</div>
            <div className={s.settings}>
                <div className={s.dough}>
                    {typeNames.map((item, index) => (
                        <div key={'type' + index} className={classNames(
                            activeType == index ? s.active : null,
                            !props.types.includes(index) ? s.disabled : null
                        )}
                             onClick={() => onSelectType(index)}>{item}</div>
                    ))}
                </div>
                <div className={s.size}>
                    {size.map((item, index) => (
                        <div key={'type' + index} className={classNames(
                            !props.sizes.includes(item) ? s.disabled : null,
                            activeSize == index ? s.active : null,
                        )}
                             onClick={() => onSelectSize(index)}>{item} см.</div>
                    ))}
                </div>
            </div>
            <div className={s.footer}>
                <div className={s.price}>от {props.price} ₽</div>
                <div className={classNames(s.addButton)} onClick={() => props.onAddCartItem(cartData)}><img
                    src="./img/plusOrange.svg" alt=""/>Добавить
                </div>
            </div>
        </div>
    )
}

export default Index;