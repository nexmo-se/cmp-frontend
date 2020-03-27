import React from "react";
import clsx from "clsx";

function Spinner({ className, white=false }){
  return (
    <div 
      className={clsx(
        "Vlt-spinner",
        (white)? "Vlt-spinner--white": "" ,
        className
      )}
    />
  )
}
export default Spinner