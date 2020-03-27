import React from "react";

function TableColumn({ children, className }){
  return <td className={className}>{children}</td>
}
export default TableColumn;