import React from "react";
import clsx from "clsx";

import VoltaIcon from "components/VoltaIcon";

function ButtonIcon({ 
  onClick, 
  icon, 
  disabled,
  type="tertiary", 
  style={}, 
  className 
}){
  return (
    <button 
      className={clsx(
        "Vlt-btn",
        `Vlt-btn--${type}`,
        "Vlt-btn--icon",
        className
      )}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      <VoltaIcon icon={icon} />
    </button>
  )
}
export default ButtonIcon;