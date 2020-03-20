import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  table: { 
    borderCollapse: "separate",
    borderSpacing: "0px 8px"
  }
}))

function Table({ children, classes={} }){
  const mStyles = useStyles();
  
  return (
    <div 
      className={clsx(
        "Vlt-table", 
        "Vlt-table--nohighlight",
        classes.root
      )}
    >
      <table 
        className={clsx(
          mStyles.table,
          classes.table
        )}
      >
        {children}
      </table>
    </div>
  )
}
export default Table;