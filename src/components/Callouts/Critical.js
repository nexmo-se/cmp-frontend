import React from "react";

function CriticalCallouts({ id, children }){
  return (
    <div className="Vlt-flash Vlt-callout Vlt-callout--critical" id={id}>
      <i/>
      <div className="Vlt-callout__content">
        <p>{children}</p>
      </div>
    </div> 
  )
}
export default CriticalCallouts;