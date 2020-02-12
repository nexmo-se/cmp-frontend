import React from "react";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";

function AddTemplateModal({ visible, setVisible, onAdded }){
  function handleCancel(){
    setVisible(false);
  }

  return (
    <Modal visible={visible}>
      <ModalHeader setVisible={setVisible}>
        <h4>Add New Template</h4>
      </ModalHeader>
      <ModalContent>
      </ModalContent>
      <ModalFooter>
        <Button type="tertiary" onClick={handleCancel}>Cancel</Button>
        <Button type="primary">Add New</Button>
      </ModalFooter>
    </Modal>
  )
}
export default AddTemplateModal;