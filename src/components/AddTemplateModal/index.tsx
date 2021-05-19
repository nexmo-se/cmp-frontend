import { Dispatch, SetStateAction } from "react";

import Modal from "components/Modal";
import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";

interface AddTemplateModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onAdded?: () => void;
}

function AddTemplateModal ({ visible, setVisible, onAdded }: AddTemplateModalProps) {
  function toggleModal () {
    setVisible(
      (visible) => !visible
    )
  }

  function onSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  return (
    <Modal visible={visible}>
      <Form onSubmitted={onSubmitted}>
        <Modal.Header setVisible={setVisible}>
          <h4>Add New Template</h4>
        </Modal.Header>
        <Modal.Content>
          <FormContent />
        </Modal.Content>
        <Modal.Footer>
          <CancelButton onClick={toggleModal} />
          <SubmitButton />
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default AddTemplateModal;