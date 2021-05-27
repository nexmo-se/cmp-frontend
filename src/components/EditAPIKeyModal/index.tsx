import ApiKey from "entities/apiKey";
import { Dispatch, SetStateAction } from "react";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import SubmitButton from "./components/SubmitButton";
import CancelButton from "./components/CancelButton";
import Modal from "components/Modal";

interface EditApiKeyModalProps {
  apiKey: ApiKey;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function EditAPIKeyModal ({ apiKey, visible, setVisible }: EditApiKeyModalProps) {
  function toggleModal () {
    setVisible((visible) => !visible)
  }

  return (
    <Modal visible={visible} size="small">
      <Form
        defaultValue={apiKey}
        onSubmitted={toggleModal}
      >
        <Modal.Header setVisible={setVisible}>
          <h4>Edit API Key</h4>
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
export default EditAPIKeyModal