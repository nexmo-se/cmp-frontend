import React from "react";
import clsx from "clsx";

function Button({ 
  children, 
  type, 
  onClick, 
  disabled,
  className,
  buttonStyle="app",
  buttonType="button", 
  style={}
}){
  return (
    <button 
      type={buttonType}
      className={clsx(
        "Vlt-btn", 
        `Vlt-btn--${type}`,
        `Vlt-btn--${buttonStyle}`,
        className
      )} 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}
export default Button;