import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  disabled: { 
    cursor: "not-allowed !important",
    pointerEvents: "all !important"
  }
}))

function Button({ 
  children, 
  type, 
  onClick, 
  disabled,
  className,
  buttonStyle="app",
  buttonType="button"
}){
  const mStyles = useStyles();

  return (
    <button 
      type={buttonType}
      className={clsx(
        "Vlt-btn", 
        `Vlt-btn--${type}`,
        `Vlt-btn--${buttonStyle}`,
        (disabled)? mStyles.disabled: "",
        className
      )} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button;