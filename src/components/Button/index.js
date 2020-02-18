import React from "react";

function Button({ 
  children, 
  type, 
  onClick, 
  disabled,
  buttonType="button", 
  style={}
}){
  return (
    <button 
      type={buttonType}
      className={`Vlt-btn Vlt-btn--${type} Vlt-btn--app`} 
      onClick={onClick} 
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}
export default Button;