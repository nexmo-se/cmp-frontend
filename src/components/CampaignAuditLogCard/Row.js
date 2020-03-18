import React from "react";

function Row({ label, children }){
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
