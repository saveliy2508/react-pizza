import React from 'react'
import ContentLoader from 'react-content-loader'
import debounce from 'lodash.debounce'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from './Pagination'

import s from './main.module.scss'

import Pizza from './Pizza'

import { RootState } from '../../redux/store'
import {
	setCategory,
	setFilters,
	setPage,
	setSearchFilter,
	setSortBy
} from '../../redux/slices/filter/slice'
import { setRenderItem } from '../../redux/slices/pizzas/slice'
import { addPizzaCart } from '../../redux/slices/cart/slice'
import { SortByTypes } from '../../redux/slices/filter/types'
import { CartItem } from '../../redux/slices/cart/types'
import { fetchPizzas } from '../../redux/slices/pizzas/asyncActions'

const Index: React.FC = () => {
	const navigate = useNavigate()

	const dispatch = useDispatch()

	const { items, renderItem } = useSelector(
		({ pizzasSlice }: RootState) => pizzasSlice
	)
	const { isLoaded } = useSelector(({ pizzasSlice }: RootState) => pizzasSlice)
	const { category, sortBy, page, searchFilter } = useSelector(
		({ filterSlice }: RootState) => filterSlice
	)

	React.useEffect(() => {
		// 1
		if (window.location.search) {
			const params: any = qs.parse(window.location.search.substring(1))
			dispatch(setFilters(params))
		}

		// 2
		document.body.addEventListener('click', handleOutsideClick)
	}, [])

	React.useEffect(() => {
		dispatch(fetchPizzas({ category, sortBy }))
	}, [category, sortBy])

	React.useEffect(() => {
		dispatch(setRenderItem({ page, searchFilter }))
	}, [category, sortBy, page, searchFilter, items])

	React.useEffect(() => {
		const queryString = qs.stringify({
			sortBy: sortBy,
			category: category,
			page: page
		})

		navigate(`?${queryString}`)
	}, [category, sortBy, page])

	const sortingButton = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые'
	]

	const subMenu: { name: any }[] = [
		{ name: 'популярности' },
		{ name: 'цене' },
		{ name: 'алфавиту' }
	]

	const onSortButton = (index: number) => {
		dispatch(setCategory(index))
		dispatch(setPage(0))
	}

	const [isSubMenu, setIsSubMenu] = React.useState<boolean>(false)

	const toggleSubMenu = () => {
		setIsSubMenu(!isSubMenu)
	}

	const onActiveSubMenu = (index: number) => {
		const name: SortByTypes = subMenu[index].name
		dispatch(setSortBy(name))
		setIsSubMenu(false)
	}

	const sortRef = React.useRef<HTMLDivElement>(null)

	const handleOutsideClick = (e: any) => {
		if (!e.path.includes(sortRef.current)) {
			setIsSubMenu(false)
		}
	}

	const onAddCartItem = (newItem: CartItem) => {
		dispatch(
			addPizzaCart({
				parentId: newItem.parentId,
				name: newItem.name,
				price: newItem.price,
				imageUrl: newItem.imageUrl,
				activeType: newItem.activeType,
				activeSize: newItem.activeSize,
				count: 1
			})
		)
	}

	const debounceFilterInput = debounce(
		(e) => dispatch(setSearchFilter(e.target.value)),
		400
	)

	const handleClearSearchInput = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const target = e.target as HTMLDivElement
		const prevSub = target.previousSibling as HTMLInputElement
		prevSub.value = ''
		dispatch(setSearchFilter(''))
	}

	return (
		<div className={s.main}>
			<div className={s.sorting}>
				<div className={s.sortingLeft}>
					{sortingButton.map((item, index) => (
						<div
							key={`Btn${index}`}
							className={category === index ? s.active : null}
							onClick={() => onSortButton(index)}
						>
							{item}
						</div>
					))}
				</div>
				<div className={s.sortingRight} ref={sortRef}>
					<div className={s.menu} onClick={toggleSubMenu}>
						<img src="./img/arrowTop.svg" alt="arrow" />
						<p>Сортировка по:</p>
						<p>
							<span>{sortBy}</span>
						</p>
					</div>
					{isSubMenu && (
						<div className={s.subMenu}>
							<div className={s.features}>
								{subMenu.map((item, index) => (
									<p
										onClick={() => onActiveSubMenu(index)}
										key={'subMenuItem' + index}
										className={
											subMenu.findIndex((item) => item.name === sortBy) ===
											index
												? s.activeSubItem
												: null
										}
									>
										{item.name}
									</p>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={s.titleContainer}>
				<div className={s.pizzasTitle}>Все пиццы</div>
				<div className={s.filterInput}>
					<input
						type="text"
						onChange={debounceFilterInput}
						placeholder="Поиск по названию"
					/>
					<div onClick={(e) => handleClearSearchInput(e)}>+</div>
				</div>
			</div>
			<div className={s.pizzas}>
				{isLoaded
					? renderItem.map((item, index) => (
							<Pizza
								key={`${item.name}${index}`}
								parentId={item.parentId}
								name={item.name}
								price={item.price}
								imageUrl={item.imageUrl}
								types={item.types}
								sizes={item.sizes}
								onAddCartItem={onAddCartItem}
							/>
					  ))
					: Array(4).fill(
							<ContentLoader
								className={s.fakePizzaBlock}
								speed={2}
								width={280}
								height={460}
								viewBox="0 0 280 460"
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
							>
								<circle cx="132" cy="142" r="115" />
								<rect x="0" y="273" rx="6" ry="6" width="280" height="26" />
								<rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
								<rect x="0" y="418" rx="6" ry="6" width="91" height="31" />
								<rect x="137" y="408" rx="25" ry="25" width="140" height="46" />
							</ContentLoader>
					  )}
			</div>
			<Pagination />
		</div>
	)
}

export default Index
