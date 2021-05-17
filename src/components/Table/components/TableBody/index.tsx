interface TableBodyProps {
  children?: any;
}

function TableBody (props: TableBodyProps) {
  const { children } = props;

  return <tbody>{children}</tbody>
}

export default TableBody;
