// @flow
import React from "react";
import clsx from "clsx";
import VoltaIcon from "components/VoltaIcon";

type Props = {
  className?:string,
  type?:string,
  icon:string
}

function ButtonIcon({ icon, type="tertiary", className, ...props }:Props){
  return (
    <button 
      {...props}
      className={clsx(
        "Vlt-btn",
        `Vlt-btn--${type}`,
        "Vlt-btn--icon",
        className
      )}
    >
      <VoltaIcon icon={icon} />
    </button>
  )
}
export default ButtonIcon;