import React from "react";

function Button(props){
  const { children, type } = props;

  const handleClick = () => props.onClick();

  return (
    <button className={`Vlt-btn Vlt-btn--${type} Vlt-btn--app`} onClick={handleClick}>
      {children}
    </button>
  )
}
export default Button;