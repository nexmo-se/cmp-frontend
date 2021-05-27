import useStyles from "./styles";
import clsx from "clsx";

interface TableBodyRowProps {
  className?: string;
  children?: any;
}

function TableBodyRow ({ className, children }: TableBodyRowProps) {
  const mStyles = useStyles();

  return (
    <tr 
      className={
        clsx(
          mStyles.tableRow,
          className
        )
      }
    >
      {children}
    </tr>
  )
}
  
export default TableBodyRow;