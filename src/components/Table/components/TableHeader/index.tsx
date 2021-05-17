import useStyles from "./styles";
import clsx from "clsx";

interface TableHeaderProps {
  className?: string;
  children: any;
}

function TableHeader ({ className, children }: TableHeaderProps) {
  const mStyles = useStyles();

  return (
    <th 
      className={
        clsx(
          mStyles.root, 
          "Vlt-grey",
          className
        )
      }
    >
      {children}
    </th>
  )
}

export default TableHeader;