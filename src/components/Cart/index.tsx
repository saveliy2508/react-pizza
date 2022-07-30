import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './cart.module.scss'

import CartItem from './CartItem'

import { clearAllPizzas } from '../../redux/slices/cartSlice'
import { RootState } from '../../redux/store'

const Cart: React.FC = () => {
	const { cartItems, totalItems, totalPrice } = useSelector(
		({ cartSlice }: RootState) => cartSlice
	)

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const handleConfirmOrder = () => {
		alert(`Спасибо за заказ!`)
		navigate(-1)
		dispatch(clearAllPizzas())
	}

	return (
		<>
			{cartItems.length !== 0 ? (
				<div className={s.CartItems}>
					<div className={s.header}>
						<div className={s.headerLeft}>
							<img src="./img/blackCart.png" alt="корзина" /> Корзина
						</div>
						<div className={s.headerRight}>
							<span onClick={() => dispatch(clearAllPizzas())}>
								<img src="./img/trashCart.svg" alt="очистка" />
								<span className={s.text}>Очистить корзину</span>
							</span>
						</div>
					</div>
					<div className={s.itemsContainer}>
						{cartItems.map((item, index) => (
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
						<div className={s.sum}>
							<div>
								Всего пицц: <span>{totalItems} шт.</span>
							</div>
							<div>
								Сумма заказа: <span>{totalPrice} ₽</span>
							</div>
						</div>
						<div className={s.buttons}>
							<button className={s.back} onClick={() => navigate(-1)}>
								<img
									className={s.arrowBack}
									src="./img/arrowBack.svg"
									alt="arrowBack"
								/>{' '}
								Вернуться назад
							</button>
							<button className={s.pay} onClick={() => handleConfirmOrder()}>
								Оплатить сейчас
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className={s.cartContainer}>
					<div className={s.emptyCart}>
						<div className={s.title}>
							Корзина пустая{' '}
							<img src="./img/smile.svg" alt="smile" className={s.smile} />
						</div>
						<div className={s.text}>
							Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
							заказать пиццу, перейди на главную страницу.
						</div>
						<img
							className={s.cartImage}
							src="./img/emptyCart.jpg"
							alt="emptyCart"
						/>
						<div className={s.button} onClick={() => navigate(-1)}>
							Вернуться назад
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Cart
