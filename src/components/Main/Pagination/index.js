import React from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'

import s from './pagination.module.scss'

import { setPage } from '../../../redux/slices/filterSlice'

const Index = () => {
	const { searchFilter } = useSelector(({ filterSlice }) => filterSlice)
	const { items } = useSelector(({ pizzasSlice }) => pizzasSlice)
	
	const dispatch = useDispatch()
	
	const handlePageClick = (pageNumber) => {
		dispatch(setPage(pageNumber.selected))
		window.scrollTo(0, 0)
	}
	
	const pageCount = Math.ceil(items.filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase())).length / 4)
	
	return (<>
		{pageCount > 1 && <ReactPaginate
			className={s.pagination}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={handlePageClick}
			pageRangeDisplayed={8}
			pageCount={pageCount}
			renderOnZeroPageCount={null} />}
	</>)
}

export default Index
