import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import s from './cartItem.module.scss'

import { RootState } from '../../../redux/store'
import {
	clearPizzas,
	decrementPizza,
	incrementPizza
} from '../../../redux/slices/cart/slice'
import { CartItem } from '../../../redux/slices/cart/types'

type CartItemProps = {
	parentId: number
	imageUrl: string
	price: number
	name: string
	activeType: number
	activeSize: number
	count: number
}

const Index: React.FC<CartItemProps> = ({
	parentId,
	imageUrl,
	price,
	name,
	activeType,
	activeSize,
	count
}) => {
	const { cartItems } = useSelector(({ cartSlice }: RootState) => cartSlice)

	const dispatch = useDispatch()

	const handleClearPizzas = () => {
		const cartItemIndex = cartItems.indexOf(
			cartItems.find(
				(item: CartItem) =>
					item.parentId === parentId &&
					item.activeType === activeType &&
					item.activeSize === activeSize
			)!
		)
		dispatch(clearPizzas(cartItemIndex))
	}

	const handleIncrementPizza = () => {
		dispatch(
			incrementPizza(
				cartItems.indexOf(
					cartItems.find(
						(item) =>
							item.parentId === parentId &&
							item.activeType === activeType &&
							item.activeSize === activeSize
					)!
				)
			)
		)
	}

	const handleDecrementPizza = () => {
		dispatch(
			decrementPizza(
				cartItems.indexOf(
					cartItems.find(
						(item) =>
							item.parentId === parentId &&
							item.activeType === activeType &&
							item.activeSize === activeSize
					)!
				)
			)
		)
	}

	return (
		<div className={s.cartItem}>
			<div className={s.cartItemLeft}>
				<img src={imageUrl} alt="пицца" />
				<div className={s.description}>
					<p className={s.name}>{name}</p>
					<p className={s.type}>
						{activeType === 0 ? 'тонкое тесто' : 'традиционное тесто'},{' '}
						{activeSize === 0 ? '26' : activeSize === 1 ? '30' : '40'} см
					</p>
				</div>
			</div>
			<div className={s.cartItemRight}>
				<div className={s.count}>
					<button onClick={handleIncrementPizza}>+</button>
					<p>{count}</p>
					<button onClick={handleDecrementPizza}>-</button>
				</div>
				<div>
					<p className={s.price}>
						{price * count}
						<span>Р</span>
					</p>
				</div>
				<button className={s.delete} onClick={handleClearPizzas}>
					+
				</button>
			</div>
		</div>
	)
}

export default Index
