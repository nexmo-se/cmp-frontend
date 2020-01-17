import React from "react";

function Table(props){
  const { children } = props;
  
  return (
    <div className="Vlt-table">
      <table>
        {children}
      </table>
    </div>
  )
}
export default Table;