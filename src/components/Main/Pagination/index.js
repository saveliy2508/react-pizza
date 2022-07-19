import React from 'react';
import ReactPaginate from "react-paginate";

import s from './pagination.module.scss'

const Index = () => {
  return (
      <ReactPaginate
        className={s.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        pageCount={3}
        renderOnZeroPageCount={null}/>
  );
};

export default Index;
