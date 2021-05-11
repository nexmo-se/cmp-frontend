import useError from "hooks/error";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

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
  setVisible: (visible: boolean) => void;
  onAdded?: () => void;
}

function AddChannelModal (props: AddChannelModalProps) {
  const { disabledChannels, visible, setVisible, onAdded } = props;
  const { throwError } = useError();

  function handleCancel () {
    setVisible(false);
  }

  function handleError (err) {
    throwError(err);
  }

  function handleSubmitted () {
    setVisible(false);
    if (onAdded) onAdded();
  }

  return (
    <FormProvider
      onSubmitted={handleSubmitted}
      onError={handleError}
    >
      <Modal visible={visible}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Channel</h4>
        </ModalHeader>
        <ModalContent>
          <BasicDetails disabledChannels={disabledChannels} />
          <NumberInsightDetails />
          <VoiceDetails />
          <SocialChannelDetails />
          <SmsDetails />
        </ModalContent>
        <ModalFooter>
          <CancelButton />
          <SubmitButton />
        </ModalFooter>
      </Modal>
    </FormProvider>
  )
}
export default AddChannelModal;