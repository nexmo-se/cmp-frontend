import APIKey from "entities/apiKey";
import { SetStateAction } from "react";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import SubmitButton from "./components/SubmitButton";
import CancelButton from "./components/CancelButton";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

interface EditApiKeyModalProps {
  apiKey: ApiKey;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function EditAPIKeyModal ({ apiKey, visible, setVisible, onEdited }:Props) {
  function toggleModal () {
    setVisible((visible) => !visible)
  }

  return (
    <Modal visible={visible} size="small">
      <Form
        defaultValue={apiKey}
        onSubmitted={toggleModal}
      >
        <ModalHeader setVisible={setVisible}>
          <h4>Edit API Key</h4>
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
export default EditAPIKeyModal