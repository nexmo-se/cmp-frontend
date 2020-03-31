import React from "react";

import Number from "./Number";

function Pagination({ totalData, limit, onChange }){
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const [ totalPage, setTotalPage ] = React.useState(null);

  function handleGoTo(number){
    setCurrentPage(number);
  }

  function handleNextClick(){
    setCurrentPage((prevCurrentPage) => {
      if(prevCurrentPage + 1 <= totalPage){
        return prevCurrentPage + 1;
      }else return prevCurrentPage;
    });
  }

  function handlePrevClick(){
    setCurrentPage((prevCurrentPage) => {
      if(prevCurrentPage - 1 > 0){
        return prevCurrentPage - 1;
      }else return prevCurrentPage;
    })
  }

  React.useEffect(() => {
    setTotalPage(Math.ceil(totalData / limit));
  }, [ totalData ]);

  React.useEffect(() => {
    if(onChange) onChange(currentPage);
  }, [ currentPage ])

  return (
    <div className="Vlt-table__pagination">
      <ul>
        <li className="Vlt-table__pagination__prev">
          <a onClick={handlePrevClick}>Previous</a>
        </li>
        {[...Array(totalPage)].map((_, index) => {
          const number = index + 1;
          return (
            <Number 
              key={index}
              number={number}
              selected={currentPage === number}
              onClick={() => handleGoTo(number)}
            />
          )
        })}
        <li className="Vlt-table__pagination__next">
          <a onClick={handleNextClick}>Next</a>
        </li>
      </ul>
    </div>
  )
}
export default Pagination;