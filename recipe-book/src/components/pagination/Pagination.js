import React from 'react';
import useFilterStore from '../store/useFilterStore';
import './Pagination.css';

const Pagination = () => {
  const currentPage = useFilterStore(state => state.currentPage);
  const next = useFilterStore(state => state.next);
  const prev = useFilterStore(state => state.prev);
  const totalPages = useFilterStore(state => state.totalPages);

  return (
    <div className="pagination">
      <button onClick={prev} disabled={currentPage === 1}> Previous </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={next} disabled={totalPages <= currentPage}> Next </button>
    </div>
  );
};

export default Pagination;
