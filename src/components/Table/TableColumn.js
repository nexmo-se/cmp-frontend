import React from "react";

function TableColumn(props){
  const { children, className } = props;
  return <td className={className}>{children}</td>
}
export default TableColumn;