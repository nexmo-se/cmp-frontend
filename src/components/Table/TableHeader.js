import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: { borderBottom: "none !important" },
}))

function TableHeader({ className, children }){
  const mStyles = useStyles();

  return (
    <th 
      className={clsx(
        mStyles.root, 
        "Vlt-grey",
        className
      )}
    >
      {children}
    </th>
  )
}

export default TableHeader;