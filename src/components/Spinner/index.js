import React from "react";
import clsx from "clsx";

function Spinner({ white=true }){
  return (
    <div 
      className={clsx(
      "Vlt-spinner",
      (white)? "Vlt-spiner--white": "" 
      )}
    />
  )
}
export default Spinner