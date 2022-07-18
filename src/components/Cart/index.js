import React from 'react';
import s from './cart.module.scss'
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";

function Cart() {
  const {items} = useSelector(({cart}) => {
    return {items: cart.items}
  })
  return (<>
      {items.length !== 0 ?
        <div className={s.CartItems}>
          <div className={s.header}>
            <div className={s.headerLeft}><img src="./img/blackCart.png" alt="корзина"/> Корзина</div>
            <div className={s.headerRigth}><span><img src="./img/trashCart.svg" alt="очистка"/>Очистить корзину</span>
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
              />
            ))}
          </div>
          <div className={s.footer}>
            <div className={s.summ}>
              <div>Всего пицц: <span>3 шт.</span></div>
              <div>Сумма заказа: <span>900 ₽</span></div>
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
