import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import s from './pizza.module.scss'

import { RootState } from '../../../redux/store'

type MainPageProps = {
	types: [number]
	sizes: [number]
	imageUrl: string
	price: number
	onAddCartItem: (cardData: any) => void
	name: string
	parentId: number
}

const Index: React.FC<MainPageProps> = ({
	types,
	sizes,
	parentId,
	imageUrl,
	name,
	price,
	onAddCartItem
}) => {
	const typeNames = ['тонкое', 'традиционное']
	const size = [26, 30, 40]

	const { cartItems } = useSelector(({ cartSlice }: RootState) => cartSlice)

	const [activeType, setActiveType] = React.useState<number>(types[0])
	const [counter, setCounter] = React.useState<number>(0)

	const onSelectType = (index: number) => {
		setActiveType(index)
	}

	const [activeSize, setActiveSize] = React.useState<number>(
		sizes[0] === 26 ? 0 : sizes[0] === 30 ? 1 : 2
	)

	const onSelectSize = (index: number) => {
		setActiveSize(index)
	}

	const cartData = {
		types,
		sizes,
		parentId,
		imageUrl,
		name,
		price,
		activeType: activeType,
		activeSize: activeSize
	}

	React.useEffect(() => {
		setCounter(
			cartItems
				.filter((item) => parentId === item.parentId)
				?.reduce((sum: number, item: { count: number }) => item.count + sum, 0)
		)
	}, [
		cartItems.filter((item: { parentId: number }) => parentId === item.parentId)
	])

	return (
		<div className={s.pizza}>
			<img className={s.image} src={imageUrl} alt="картинка" />
			<div className={s.title}>{name}</div>
			<div className={s.settings}>
				<div className={s.dough}>
					{typeNames.map((item, index) => (
						<div
							key={'type' + index}
							className={classNames(
								activeType === index ? s.active : null,
								!types.includes(index) ? s.disabled : null
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
								!sizes.includes(item) ? s.disabled : null,
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
				<div className={s.price}>от {price} ₽</div>
				<div
					className={classNames(s.addButton)}
					onClick={() => onAddCartItem(cartData)}
				>
					<img src="./img/plusOrange.svg" alt="добавить" />
					Добавить {counter !== 0 && <span>{counter}</span>}
				</div>
			</div>
		</div>
	)
}

export default Index
