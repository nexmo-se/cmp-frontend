import React from "react";

function Button(props){
  const { children, type } = props;

  return (
    <button className={`Vlt-btn Vlt-btn--${type} Vlt-btn--app`}>
      {children}
    </button>
  )
}
export default Button;