import React from 'react';
import ReactPaginate from "react-paginate";

import s from './pagination.module.scss'

import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../redux/slices/filterSlice";
import axios from "axios";
import {fetchPizzasWithoutPages} from "../../../redux/slices/pizzasSlice";

const Index = () => {
  
  const {sortBy, category, searchFilter} = useSelector(({filterSlice}) => filterSlice)
  const {items, itemsWithoutPage} = useSelector(({pizzasSlice}) => pizzasSlice)
  
  const dispatch = useDispatch()
  
  const handlePageClick = (pageNumber) => {
    dispatch(setPage(pageNumber.selected + 1))
    window.scrollTo(0, 0)
  }
  
  React.useEffect(() => {
    dispatch(fetchPizzasWithoutPages({category, sortBy}))
  }, [sortBy, category, searchFilter]);
  
  return (
    <>
        <ReactPaginate
          className={s.pagination}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={8}
          pageCount={Math.ceil(itemsWithoutPage?.length / 4)}
          renderOnZeroPageCount={null}/>
    </>
  )
};

export default Index;
