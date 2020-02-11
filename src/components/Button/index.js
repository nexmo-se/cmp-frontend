import React from "react";

function Button({ children, type, onClick, disabled }){
  return (
    <button 
      className={`Vlt-btn Vlt-btn--${type} Vlt-btn--app`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button;