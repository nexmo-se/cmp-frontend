import React from "react";

function TableHead(props){
  const { children } = props;
  
  return <thead>{children}</thead>
}
export default TableHead;