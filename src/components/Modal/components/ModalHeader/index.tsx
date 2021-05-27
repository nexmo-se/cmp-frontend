import { Dispatch, SetStateAction } from "react";

interface ModalHeaderProps {
  children?: any;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function ModalHeader ({ children, setVisible }: ModalHeaderProps) {
  function handleDismiss () {
    setVisible(false);
  }

  return (
    <div className="Vlt-modal__header">
      {children}
      <div
        className="Vlt-modal__dismiss"
        onClick={handleDismiss}
      />
    </div>
  )
}
export default ModalHeader;