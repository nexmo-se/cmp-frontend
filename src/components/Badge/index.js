import React from "react";
import clsx from "clsx";

function Badge({ children, className }){
  return (
    <div 
      className={clsx(
        "Vlt-badge",
        "Vlt-white",
        className
      )}
    >
      {children}
    </div>
  )
}
export default Badge;