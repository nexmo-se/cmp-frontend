import React from "react";

function ModalHeader({ children, setVisible }){
  function handleDismiss(){
    setVisible(false);
  }

  return (
    <div className="Vlt-modal__header">
      {children}
      <div className="Vlt-modal__dismiss" onClick={handleDismiss} />
    </div>
  )
}
export default ModalHeader;