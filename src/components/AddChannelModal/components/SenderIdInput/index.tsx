import TextInput from "components/TextInput";
import { useForm } from "../Form";

function SenderIdInput () {
  const { channel, senderId, setSenderId } = useForm();
  
  return (
    <TextInput
      label={channel === "voice"? "Caller ID": "Sender ID"}
      value={senderId}
      setValue={setSenderId}
    />
  )
}

export default SenderIdInput;
