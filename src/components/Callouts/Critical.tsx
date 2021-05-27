interface CriticalCalloutsProps {
  id: string;
  children?: any;
}

function CriticalCallouts ({ id, children }: CriticalCalloutsProps) {
  return (
    <div
      className="Vlt-flash Vlt-callout Vlt-callout--critical"
      id={id}
    >
      <i/>
      <div className="Vlt-callout__content">
        <p>{children}</p>
      </div>
    </div> 
  )
}

export default CriticalCallouts;
