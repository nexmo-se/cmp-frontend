import React from "react";
import clsx from "clsx";

function Table({ children, classes={} }){
  
  return (
    <div className={clsx("Vlt-table", classes.root)}>
      <table className={classes.table}>
        {children}
      </table>
    </div>
  )
}
export default Table;