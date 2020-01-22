import React from "react";

function ModalContent(props){
  const { children } = props;

  return (
    <div className="Vlt-modal__content">
      {children}
    </div>
  )
}
export default ModalContent;