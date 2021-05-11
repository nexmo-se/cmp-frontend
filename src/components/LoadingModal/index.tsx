import useStyles from "./styles";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import Spinner from "components/Spinner";

interface LoadingModalProps {
  visible: boolean;
  label: string;
}

function LoadingModal ({ visible, label }: LoadingModalProps) {
  const mStyles = useStyles();

  return (
    <Modal
      size="small"
      visible={visible}
    >
      <ModalContent className={mStyles.content}>
        <Spinner white={false} />
        <h4>{label}</h4>
      </ModalContent>
    </Modal>
  )
}

export default LoadingModal;
