interface SuccessCalloutsProps {
  id: string;
  children?: any;
}

function SuccessCallouts ({ id, children }: SuccessCalloutsProps) {
  return (
    <div
      className="Vlt-flash Vlt-callout Vlt-callout--good"
      id={id}
    >
      <i/>
      <div className="Vlt-callout__content">
        <p>{children}</p>
      </div>
    </div> 
  )
}

export default SuccessCallouts;
