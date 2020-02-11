import React from "react";

function ModalHeader({ children }){
  return (
    <div className="Vlt-modal__header">
      {children}
      <div className="Vlt-modal__dismiss"></div>
    </div>
  )
}
export default ModalHeader;