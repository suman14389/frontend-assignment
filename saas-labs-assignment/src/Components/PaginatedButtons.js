import React, { useState } from "react";
import "../Styles/Buttons.css";

const PaginatedButtons = ({ numberOfPages, currentPage, setCurrentPage }) => {
  const [startPage, setStartPage] = useState(1);
  const VISIBLE_PAGES = 3; // Number of page buttons to show at once

  const getVisibleButtons = () => {
    let end = Math.min(startPage + VISIBLE_PAGES - 1, numberOfPages);
    return Array.from(
      { length: Math.min(VISIBLE_PAGES, end - startPage + 1) },
      (_, index) => startPage + index
    );
  };

  const handleClickNextBtn = () => {
    if (startPage + VISIBLE_PAGES <= numberOfPages) {
      setStartPage(startPage + 1);
      // Only update current page if it would go out of view
      if (currentPage < startPage + 1) {
        setCurrentPage(startPage + 1);
      }
    }
  };

  const handleClickPreviousBtn = () => {
    if (startPage > 1) {
      setStartPage(startPage - 1);
      // Only update current page if it would go out of view
      if (currentPage > startPage + VISIBLE_PAGES - 2) {
        setCurrentPage(startPage + VISIBLE_PAGES - 2);
      }
    }
  };

  return (
    <>
      <div className="paginated-buttons">
        <button
          disabled={startPage === 1}
          onClick={handleClickPreviousBtn}
          id="previous-btn"
        >
          Previous
        </button>
        {getVisibleButtons().map((pageNum) => (
          <button
            key={pageNum}
            className={currentPage === pageNum ? "active-page" : ""}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button
          disabled={startPage + VISIBLE_PAGES > numberOfPages}
          onClick={handleClickNextBtn}
          id="next-btn"
        >
          Next
        </button>
      </div>
      <span className="page-number-text">Current Page: {currentPage}</span>
    </>
  );
};

export default PaginatedButtons;
