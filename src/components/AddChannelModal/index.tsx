import useError from "hooks/error";
import { Dispatch, SetStateAction } from "react";

import Modal from "components/Modal";
import CancelButton from "./components/CancelButton";
import SubmitButton from "./components/SubmitButton";
import NumberInsightDetails from "./components/NumberInsightDetails";
import VoiceDetails from "./components/VoiceDetails";
import SmsDetails from "./components/SmsDetails";
import BasicDetails from "./components/BasicDetails";
import SocialChannelDetails from "./components/SocialChannelDetails";
import FormProvider from "./components/Form";

interface AddChannelModalProps {
  disabledChannels?: string[];
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onAdded?: () => void;
}

function AddChannelModal (props: AddChannelModalProps) {
  const { disabledChannels, visible, setVisible, onAdded } = props;
  const { throwError } = useError();

  function handleError (err: Error) {
    throwError(err);
  }

  function handleSubmitted () {
    toggleModal();
    if (onAdded) onAdded();
  }

  function toggleModal () {
    setVisible(
      (visible) => !visible
    )
  }

  return (
    <FormProvider
      onSubmitted={handleSubmitted}
      onError={handleError}
    >
      <Modal visible={visible}>
        <Modal.Header setVisible={setVisible}>
          <h4>Add New Channel</h4>
        </Modal.Header>
        <Modal.Content>
          <BasicDetails disabledChannels={disabledChannels ?? []} />
          <NumberInsightDetails />
          <VoiceDetails />
          <SocialChannelDetails />
          <SmsDetails />
        </Modal.Content>
        <Modal.Footer>
          <CancelButton onClick={toggleModal}/>
          <SubmitButton />
        </Modal.Footer>
      </Modal>
    </FormProvider>
  )
}
export default AddChannelModal;