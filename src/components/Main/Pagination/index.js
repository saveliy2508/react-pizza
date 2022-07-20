import React from 'react';
import ReactPaginate from "react-paginate";

import s from './pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../../redux/slices/filterSlice";
import axios from "axios";

const Index = ({filterInput}) => {
  
  const {sortBy, category} = useSelector(({filterSlice}) => filterSlice)
  
  const dispatch = useDispatch()
  
  const handlePageClick = (pageNumber) => {
    dispatch(setPage(pageNumber.selected+1))
    window.scrollTo(0,0)
  }
  
  const [itemsWithoutPage, setItemsWithoutPage] = React.useState([]);;
  React.useEffect(() => {
      axios.get(`https://6242deadd126926d0c58b871.mockapi.io/items?sortBy=${sortBy == 'алфавиту' ? 'name' : sortBy == 'популярности' ? 'rating' : 'price'}${category ? `&category=${category - 1}` : ''}`).then(({data}) => setItemsWithoutPage(data))
  }, [sortBy, category]);
  
  let pageCount = itemsWithoutPage.filter(item => item.name.toLowerCase().includes(filterInput.toLowerCase())) ? Math.ceil(itemsWithoutPage.filter(item => item.name.toLowerCase().includes(filterInput.toLowerCase())).length/4) : 1;
  
  return (
    <ReactPaginate
      className={s.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageRangeDisplayed={8}
      pageCount={pageCount}
      renderOnZeroPageCount={null}/>
  );
};

export default Index;
