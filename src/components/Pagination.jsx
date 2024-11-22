import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../Redux/recipeSlice';

const Pagination = ({ currentPage, totalResults, itemsPerPage }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    window.scrollTo(0, 0);
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="mt-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {[...Array(Math.min(5, totalPages))].map((_, index) => {
          const pageNumber = currentPage - 2 + index;
          if (pageNumber > 0 && pageNumber <= totalPages) {
            return (
              <li 
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          }
          return null;
        })}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;