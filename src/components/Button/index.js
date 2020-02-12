import React from "react";

function Button({ children, buttonType="button", type, onClick, disabled }){
  return (
    <button 
      type={buttonType}
      className={`Vlt-btn Vlt-btn--${type} Vlt-btn--app`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button;