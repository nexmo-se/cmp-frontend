import React from "react";

function Modal({ visible, children }){
  return (
    <div className={`Vlt-modal ${visible? "Vlt-modal_visible": ""} Vlt-modal Vlt-modal--large`}>
      <div className="Vlt-modal__panel">
        {children}
      </div>
    </div>
  );
}
export default Modal;