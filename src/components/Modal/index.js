import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  reducedZIndex: {
    zIndex: 99
  }
}))

function Modal({ visible, children, className, size="large" }){
  const mStyles = useStyles();

  return (
    <div 
      className={clsx(
        "Vlt-modal",
        (visible)? "Vlt-modal_visible": "",
        `Vlt-modal--${size}`,
        mStyles.reducedZIndex,
        className
      )}
    >
      <div className="Vlt-modal__panel">
        {children}
      </div>
    </div>
  );
}
export default Modal;