interface TableColumnProps {
  children?: any;
  className?: string;
}

function TableColumn ({ children, className }: TableColumnProps) {
  return <td className={className}>{children}</td>
}
export default TableColumn;