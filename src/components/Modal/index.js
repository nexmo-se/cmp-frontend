import React from "react";

function Modal({ visible, children, style={}, size="large" }){
  return (
    <div 
      className={`Vlt-modal ${visible? "Vlt-modal_visible": ""} Vlt-modal Vlt-modal--${size}`}
      style={style}
    >
      <div className="Vlt-modal__panel">
        {children}
      </div>
    </div>
  );
}
export default Modal;