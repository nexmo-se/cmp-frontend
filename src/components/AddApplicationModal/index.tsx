import { Dispatch, SetStateAction } from "react"

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";

interface AddApplicationModal {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<booelan>>;
  onAdded?: () => void;
}

function AddApplicationModal ({ visible, setVisible, onAdded }: AddApplicationModal) {
  function toggleModal () {
    setVisible(false);
  }

  return (
    <Modal visible={visible}>
      <Form onSubmitted={toggleModal}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Application</h4>
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
export default AddApplicationModal;