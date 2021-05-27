import { Dispatch, SetStateAction } from "react"

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";
import Modal from "components/Modal";

interface AddApplicationModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onAdded?: () => void;
}

function AddApplicationModal ({ visible, setVisible, onAdded }: AddApplicationModalProps) {
  function toggleModal () {
    setVisible(false);
  }

  function handleSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  return (
    <Modal visible={visible}>
      <Form onSubmitted={handleSubmitted}>
        <Modal.Header setVisible={setVisible}>
          <h4>Add New Application</h4>
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
export default AddApplicationModal;