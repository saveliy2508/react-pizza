import React from 'react';
import s from './cartItem.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {clearPizzas, decrementPizza, incrementPizza} from "../../../redux/slices/cartSlice";

const Index = ({parentId, imageUrl, price, name, activeType, activeSize, count}) => {
  const {items} = useSelector(({cartSlice}) => cartSlice)
  const dispatch = useDispatch()
  const handleClearPizzas = () => {
    dispatch(clearPizzas(items.indexOf(items.find(item => item.parentId == parentId && item.activeType == activeType && item.activeSize == activeSize))))
  }
  const handleIncrementPizza = () => {
    dispatch(incrementPizza(items.indexOf(items.find(item => item.parentId == parentId && item.activeType == activeType && item.activeSize == activeSize))))
  }
  
  const handleDecrementPizza = () => {
    dispatch(decrementPizza(items.indexOf(items.find(item => item.parentId == parentId && item.activeType == activeType && item.activeSize == activeSize))))
  }
  
  return (
    <div className={s.cartItem}>
      <div className={s.cartItemLeft}>
        <img src={imageUrl} alt="пицца"/>
        <div className={s.description}>
          <p className={s.name}>{name}</p>
          <p
            className={s.type}>{activeType == 0 ? 'тонкое тесто' : 'традиционное тесто'}, {activeSize == 0 ? '26' : activeSize == 1 ? '30' : '40'} см</p>
        </div>
      </div>
      <div className={s.cartItemRight}>
        <div className={s.count}>
          <button onClick={handleIncrementPizza}>+</button>
          <p>{count}</p>
          <button onClick={handleDecrementPizza}>-</button>
        </div>
        <div>
          <p className={s.price}>{price * count}<span>Р</span></p>
        </div>
        <button className={s.delete} onClick={handleClearPizzas}>+</button>
      </div>
    </div>
  );
};

export default Index;
