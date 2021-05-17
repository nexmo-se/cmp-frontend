import { Dispatch, SetStateAction } from "react";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";

interface AddCampaignmodalProps {
  campaign: Campaign;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function AddCampaignModal ({ campaign, visible, setVisible }: AddCampaignmodalProps){

  function handleSubmitted () {
    setVisible(false);
  }

  return (
    <Modal visible={visible}>
      <Form
        initialValue={campaign}
        onSubmitted={handleSubmitted}
      >
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Campaign</h4>
        </ModalHeader>
        <ModalContent>
          <FormContent />
        </ModalContent>
        <ModalFooter>
          <CancelButton />
          <SubmitButton />
        </ModalFooter>
      </Form>
    </Modal>
  )
}
export default AddCampaignModal;