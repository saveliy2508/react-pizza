import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import s from './header.module.scss'

import { RootState } from '../../redux/store'

const Index: React.FC = () => {
	const { cartItems, totalItems, totalPrice } = useSelector(
		({ cartSlice }: RootState) => cartSlice
	)

	const location = useLocation()

	let isMounted = React.useRef(false)

	React.useEffect(() => {
		if (isMounted.current) {
			const json = JSON.stringify({ cartItems, totalItems, totalPrice })
			localStorage.setItem('cart', json)
		}
		isMounted.current = true
	}, [cartItems])

	return (
		<header className={s.header}>
			<NavLink to="/">
				<div className={s.headerLeft}>
					<img className={s.logo} src="./img/logo.svg" alt="logo" />
					<div className={s.title}>REACT PIZZA</div>
					<div className={s.slogan}>самая вкусная пицца во вселенной</div>
				</div>
			</NavLink>

			{location.pathname !== '/cart' && (
				<NavLink to="/cart">
					<div className={s.headerRight}>
						<div className={s.leftPart}>{totalPrice} ₽</div>
						<div className={s.border}></div>
						<div className={s.rightPart}>
							<img className={s.cart} src="./img/cart.svg" alt="cart" />
							{totalItems}
						</div>
					</div>
				</NavLink>
			)}
		</header>
	)
}

export default Index
