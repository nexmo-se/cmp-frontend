import React from "react";

function SuccessCallouts({ id, children }){
  return (
    <div className="Vlt-flash Vlt-callout Vlt-callout--good" id={id}>
      <i/>
      <div className="Vlt-callout__content">
        <p>{children}</p>
      </div>
    </div> 
  )
}
export default SuccessCallouts;