import useStyles from "./styles";
import clsx from "clsx";

import TableBody from "./components/TableBody";
import TableBodyRow from "./components/TableBodyRow";
import TableColumn from "./components/TableColumn";
import TableHead from "./components/TableHead";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

interface TableProps {
  children: any;
  classes?: Record<string, any>
}

function Table ({ children, classes={} }: TableProps) {
  const mStyles = useStyles();
  
  return (
    <div 
      className={
        clsx(
          "Vlt-table", 
          "Vlt-table--nohighlight",
          classes.root
        )
      }
    >
      <table 
        className={
          clsx(
            mStyles.table,
            classes.table
          )
        }
      >
        {children}
      </table>
    </div>
  )
}

Table.Body = TableBody;
Table.BodyRow = TableBodyRow;
Table.Column = TableColumn;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;
export default Table;