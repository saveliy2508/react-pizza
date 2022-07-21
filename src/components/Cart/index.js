import React from 'react';
import s from './cart.module.scss'
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";
import {clearAllPizzas} from "../../redux/slices/cartSlice";

function Cart() {
  const {items, totalItems, totalPrice} = useSelector(({cartSlice}) => cartSlice)
  
  const dispatch = useDispatch()
  
  return (<>
      {items.length !== 0 ?
        <div className={s.CartItems}>
          <div className={s.header}>
            <div className={s.headerLeft}><img src="./img/blackCart.png" alt="корзина"/> Корзина</div>
            <div className={s.headerRigth}><span onClick={() => dispatch(clearAllPizzas())}><img
              src="./img/trashCart.svg" alt="очистка"/><span className={s.text}>Очистить корзину</span></span>
            </div>
          </div>
          <div className={s.itemsContainer}>
            {items.map((item, index) => (
              <CartItem
                key={`${Date.now()}${index}`}
                parentId={item.parentId}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                activeType={item.activeType}
                activeSize={item.activeSize}
                count={item.count}
              />
            ))}
          </div>
          <div className={s.footer}>
            <div className={s.summ}>
              <div>Всего пицц: <span>{totalItems} шт.</span></div>
              <div>Сумма заказа: <span>{totalPrice} ₽</span></div>
            </div>
            <div className={s.buttons}>
              <button className={s.back}>Вернуться назад</button>
              <button className={s.pay}>Оплатить сейчас</button>
            </div>
          </div>
        </div>
        :
        <div className={s.cartConteiner}>
          <div className={s.emptyCart}>
            <div className={s.title}>Корзина пустая <img src="./img/smile.svg" alt="smile"
                                                         className={s.smile}/>
            </div>
            <div className={s.text}>Вероятней всего, вы не заказывали ещё пиццу.
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </div>
            <img className={s.cartImage} display='block' src='./img/emptyCart.jpg'/>
            <div className={s.button}>Вернуться назад</div>
          </div>
        </div>
      }
    </>
  )
    ;
};

export default Cart;
