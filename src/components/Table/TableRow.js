import React from "react";
import clsx from "clsx";


function TableRow({ className, children }){
  return (
    <tr className={clsx(className)}>
      {children}
    </tr>
  )
}
  
export default TableRow;