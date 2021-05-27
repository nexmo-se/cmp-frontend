import { Dispatch, SetStateAction } from "react";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import SubmitButton from "./components/SubmitButton";
import CancelButton from "./components/CancelButton";
import Modal from "components/Modal";

interface AddAPIKeyModalProps {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>;
  onAdded?: () => void;
}

function AddAPIKeyModal ({ visible, setVisible, onAdded }: AddAPIKeyModalProps) {

  function toggleModal () {
    setVisible(
      (visible) => !visible
    );
  }

  function handleSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  return (
    <Form onSubmitted={handleSubmitted}>
      <Modal visible={visible} size="small">
        <Modal.Header setVisible={setVisible}>
          <h4>Add New API Key</h4>
        </Modal.Header>
        <Modal.Content>
          <FormContent />
        </Modal.Content>
        <Modal.Footer>
          <CancelButton onClick={toggleModal} />
          <SubmitButton />
        </Modal.Footer>
      </Modal>
    </Form>
  )
}
export default AddAPIKeyModal