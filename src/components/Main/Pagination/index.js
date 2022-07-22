import React from 'react';
import ReactPaginate from "react-paginate";

import s from './pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../redux/slices/filterSlice";
import axios from "axios";

const Index = () => {
  
  const {sortBy, category, searchFilter} = useSelector(({filterSlice}) => filterSlice)
  
  const dispatch = useDispatch()
  
  const handlePageClick = (pageNumber) => {
    dispatch(setPage(pageNumber.selected + 1))
    window.scrollTo(0, 0)
  }
  
  const [itemsWithoutPage, setItemsWithoutPage] = React.useState([]);
  React.useEffect(() => {
    axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?search=${searchFilter}&sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category ? `&category=${category - 1}` : ''}`).then(({data}) => setItemsWithoutPage(data))
  }, [sortBy, category, searchFilter]);
  
  return (
    <>
      {Math.ceil(itemsWithoutPage.length / 4) > 1 &&
        <ReactPaginate
          className={s.pagination}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={8}
          pageCount={Math.ceil(itemsWithoutPage.length / 4)}
          renderOnZeroPageCount={null}/>}
    </>
  )
};

export default Index;
