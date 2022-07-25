import React from 'react';
import ReactPaginate from "react-paginate";

import s from './pagination.module.scss'

import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../redux/slices/filterSlice";

const Index = () => {
  const {sortBy, category, searchFilter} = useSelector(({filterSlice}) => filterSlice)
  
  const dispatch = useDispatch()
  
  const handlePageClick = (pageNumber) => {
    dispatch(setPage(pageNumber.selected))
    window.scrollTo(0, 0)
  }
  
  const {items} = useSelector(({pizzasSlice}) => pizzasSlice);
  
  const pageCount = Math.ceil(items.filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase())).length / 4)
  console.log(pageCount)
  return (
    <>
      {pageCount > 1 &&
        <ReactPaginate
          className={s.pagination}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={8}
          pageCount={pageCount}
          renderOnZeroPageCount={null}/>
      }
    </>
  )
};

export default Index;
