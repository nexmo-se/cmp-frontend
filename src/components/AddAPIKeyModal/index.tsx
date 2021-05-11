import APIKey from "entities/apiKey";
import { Dispatch, SetStateAction } from "react";

import useAPIKey from "hooks/apiKey";
import { useState, useEffect } from "react";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import SubmitButton from "./components/SubmitButton";
import CancelButton from "./components/CancelButton";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

interface AddAPIKeyModal {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function AddAPIKeyModal({ visible, setVisible, onAdded }:Props){
  const [isAdding, setIsAdding] = useState(false);

  function handleSubmitted () {
    setVisible(false);
  }

  return (
    <Form onSubmitted={handleSubmitted}>
      <Modal visible={visible} size="small">
        <ModalHeader setVisible={setVisible}>
          <h4>Add New API Key</h4>
        </ModalHeader>
        <ModalContent>
          <FormContent />
        </ModalContent>
        <ModalFooter>
          <CancelButton />
          <SubmitButton />
        </ModalFooter>
      </Modal>
    </Form>
  )
}
export default AddAPIKeyModal