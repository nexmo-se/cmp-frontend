import React from "react";
import clsx from "clsx";

function ModalContent({ children, className=[] }){
  return (
    <div className={clsx("Vlt-modal__content", ...className)}>
      {children}
    </div>
  )
}
export default ModalContent;