interface RowHeaderProps {
  children?: any;
}

function RowHeader ({ children }: RowHeaderProps) {
  return (
    <div className="Vlt-col">
      <p><b>{children}</b></p>
    </div>
  )
}
export default RowHeader;
