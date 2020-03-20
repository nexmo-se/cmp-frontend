import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  tableRow: { 
    backgroundColor: "#fff",
    padding: 24,
    cursor: "pointer",
    "& td": {
      border: "1px solid #e1e2e6",
      borderStyle: "solid none"
    },
    "& td:first-child": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderLeft: "1px solid #e1e2e6"
    },
    "& td:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderRight: "1px solid #e1e2e6"
    }
  }
}))

function TableBodyRow({ className, children }){
  const mStyles = useStyles();

  return (
    <tr 
      className={clsx(
        mStyles.tableRow,
        className
      )}
    >
      {children}
    </tr>
  )
}
  
export default TableBodyRow;