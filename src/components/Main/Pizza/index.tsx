import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import s from './pizza.module.scss'

const Index: React.FC<{
	types: [number]
	sizes: [number]
	imageUrl: string
	price: number
	onAddCartItem: Function
	name: string
	parentId: number
}> = (props) => {
	const typeNames = ['тонкое', 'традиционное']
	const size = [26, 30, 40]

	const { items }: any = useSelector<{
		cartSlice: {}
	}>(({ cartSlice }) => cartSlice)

	const [activeType, setActiveType] = React.useState<number>(props.types[0])
	const [counter, setCounter] = React.useState<number>(0)

	const onSelectType = (index: number) => {
		setActiveType(index)
	}

	const [activeSize, setActiveSize] = React.useState<number>(
		props.sizes[0] === 26 ? 0 : props.sizes[0] === 30 ? 1 : 2
	)

	const onSelectSize = (index: number) => {
		setActiveSize(index)
	}

	const cartData = {
		...props,
		activeType: activeType,
		activeSize: activeSize
	}

	React.useEffect(() => {
		setCounter(
			items
				.filter(
					(item: { parentId: number }) => props.parentId === item.parentId
				)
				?.reduce((sum: number, item: { count: number }) => item.count + sum, 0)
		)
	}, [
		items.filter(
			(item: { parentId: number }) => props.parentId === item.parentId
		)
	])

	return (
		<div className={s.pizza}>
			<img className={s.image} src={props.imageUrl} alt="картинка" />
			<div className={s.title}>{props.name}</div>
			<div className={s.settings}>
				<div className={s.dough}>
					{typeNames.map((item, index) => (
						<div
							key={'type' + index}
							className={classNames(
								activeType === index ? s.active : null,
								!props.types.includes(index) ? s.disabled : null
							)}
							onClick={() => onSelectType(index)}
						>
							{item}
						</div>
					))}
				</div>
				<div className={s.size}>
					{size.map((item, index) => (
						<div
							key={'type' + index}
							className={classNames(
								!props.sizes.includes(item) ? s.disabled : null,
								activeSize === index ? s.active : null
							)}
							onClick={() => onSelectSize(index)}
						>
							{item} см.
						</div>
					))}
				</div>
			</div>
			<div className={s.footer}>
				<div className={s.price}>от {props.price} ₽</div>
				<div
					className={classNames(s.addButton)}
					onClick={() => props.onAddCartItem(cartData)}
				>
					<img src="./img/plusOrange.svg" alt="добавить" />
					Добавить {counter !== 0 && <span>{counter}</span>}
				</div>
			</div>
		</div>
	)
}

export default Index