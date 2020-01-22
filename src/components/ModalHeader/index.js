import React from "react";

function ModalHeader(props){
  const { children } = props;
  return (
    <div className="Vlt-modal__header">
      {children}
      <div className="Vlt-modal__dismiss"></div>
    </div>
  )
}
export default ModalHeader;