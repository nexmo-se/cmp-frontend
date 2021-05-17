interface TableRowProps {
  className?: string;
  children?: any;
}

function TableRow ({ className, children }: TableRowProps) {
  return (
    <tr className={className}>
      {children}
    </tr>
  )
}
  
export default TableRow;