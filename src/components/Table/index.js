import React from "react";

function Table(props){
  const { children } = props;
  
  return (
    <div className="Vlt-table Vlt-table--data Vlt-table--data--dark">
      <table>
        {children}
      </table>
    </div>
  )
}
export default Table;