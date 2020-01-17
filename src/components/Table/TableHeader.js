import React from "react";

function TableHeader(props){
  const { children } = props;
  return(
    <th style={{ borderBottom: "1px solid #e1e2e6" }}>{children}</th>
  )
}
export default TableHeader;