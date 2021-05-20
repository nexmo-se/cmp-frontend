import Campaign from "entities/campaign";
import { Dispatch, SetStateAction } from "react";

import Form from "./components/Form";
import FormContent from "./components/FormContent";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";
import Modal from "components/Modal";

interface AddCampaignModalProps {
  campaign?: Campaign;
  type?: "default" | "number_insight";
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onAdded?: () => void;
}

function AddCampaignModal ({ type = "default", campaign, visible, setVisible, onAdded }: AddCampaignModalProps){

  function toggleModal () {
    setVisible(
      (visible) => !visible
    )
  }

  function handleSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  return (
    <Modal visible={visible}>
      <Form
        initialValue={campaign}
        onSubmitted={handleSubmitted}
      >
        <Modal.Header setVisible={setVisible}>
          <h4>Add New Campaign</h4>
        </Modal.Header>
        <Modal.Content>
          <FormContent type={type} />
        </Modal.Content>
        <Modal.Footer>
          <CancelButton onClick={toggleModal} />
          <SubmitButton />
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
export default AddCampaignModal;