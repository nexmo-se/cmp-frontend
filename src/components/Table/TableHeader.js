import React from "react";
import clsx from "clsx";

function TableHeader({ className, children }){
  return (
    <th className={clsx(className)}>
      {children}
    </th>
  )
}

export default TableHeader;