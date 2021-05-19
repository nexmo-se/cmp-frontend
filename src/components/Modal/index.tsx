import clsx from "clsx";
import useStyles from "./styles";

import ModalContent from "./components/ModalContent";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";

interface ModalProps {
  visible: boolean;
  children?: any;
  className?: string;
  size?: string;
}

function Modal ({ visible, children, className, size = "large" }: ModalProps) {
  const mStyles = useStyles();

  return (
    <div 
      className={
        clsx(
          "Vlt-modal",
          (visible)? "Vlt-modal_visible": "",
          `Vlt-modal--${size}`,
          mStyles.reducedZIndex,
          className
        )
    }
    >
      <div className="Vlt-modal__panel">
        {children}
      </div>
    </div>
  );
}

Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
export default Modal;