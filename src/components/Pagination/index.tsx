import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import Number from "./components/Number";

interface PaginationProps {
  totalData: number;
  limit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function Pagination ({ totalData, limit, currentPage, setCurrentPage }: PaginationProps) {
  const [totalPage, setTotalPage] = useState(null);

  function handleGoTo (number: number) {
    setCurrentPage(number);
  }

  function handleNextClick () {
    setCurrentPage(
      (prevCurrentPage) => {
        if (prevCurrentPage + 1 <= totalPage) {
          return prevCurrentPage + 1;
        } else return prevCurrentPage;
      }
    );
  }

  function handlePrevClick () {
    setCurrentPage(
      (prevCurrentPage) => {
        if (prevCurrentPage - 1 > 0) {
          return prevCurrentPage - 1;
        } else return prevCurrentPage;
      }
    )
  }

  useEffect(
    () => {
      if (!totalData) setTotalPage(0)
      else setTotalPage(Math.ceil(totalData / limit));
    },
    [totalData]
  );

  return (
    <div className="Vlt-table__pagination">
      <ul>
        <li className="Vlt-table__pagination__prev">
          <a onClick={handlePrevClick}>Previous</a>
        </li>
        {
          [...Array(totalPage)].map(
            (_, index) => {
              const number = index + 1;
              return (
                <Number 
                  key={index}
                  number={number}
                  selected={currentPage === number}
                  onClick={() => handleGoTo(number)}
                />
              )
            }
          )
        }
        <li className="Vlt-table__pagination__next">
          <a onClick={handleNextClick}>Next</a>
        </li>
      </ul>
    </div>
  )
}

export default Pagination;
