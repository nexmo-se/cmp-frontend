interface RowProps {
  label: string;
  children?: any;
}

function Row ({ label, children }: RowProps) {
  return (
    <div className="Vlt-grid">
      <div className="Vlt-col">
        <p>{label}</p>
      </div>
      <div className="Vlt-col">
        {children}
      </div>
    </div>
  )
}
export default Row;
