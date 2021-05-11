import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";

interface AddTemplateModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onAdded?: () => void;
}

function AddTemplateModal ({ visible, setVisible, onAdded }: AddTemplateModalProps) {
  function toggleModal () {
    setVisible((visible) => !visible);
  }

  function onSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  return (
    <Modal visible={visible}>
      <Form onSubmitted={onSubmitted}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Template</h4>
        </ModalHeader>
        <ModalContent>
          <FormContent />
        </ModalContent>
        <ModalFooter>
          <CancelButton onClick={toggleModal} />
          <SubmitButton />
        </ModalFooter>
      </Form>
    </Modal>
  )
}
export default AddTemplateModal;