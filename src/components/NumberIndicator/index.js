import React from "react";
import clsx from "clsx";

function NumberIndicator({ number, className }){
  return (
    <div 
      className={clsx(
        "Vlt-number",
        "Vlt-number--dialer",
        className
      )}
      data-index={number} 
    />
  )
}
export default NumberIndicator;
