import { useForm } from "../Form";

import ApiKeyInput from "../ApiKeyInput";
import SenderIdInput from "../SenderIdInput";
import TpsInput from "../TpsInput";
import ApplicationInput from "../ApplicationInput";

function VoiceDetails () {
  const { channel } = useForm();

  if (channel === "voice") {
    return (
      <>
        <div className="Vlt-grid Vlt-grid--narrow">
          <div className="Vlt-col Vlt-col--A">
            <SenderIdInput />
          </div>
          <div className="Vlt-col Vlt-col--A">
            <TpsInput />
          </div>
        </div>
        <div className="Vlt-grid Vlt-grid--narrow">
          <div className="Vlt-col Vlt-col--A">
            <ApiKeyInput />
          </div>
          <div className="Vlt-col Vlt-col--A">
            <ApplicationInput />
          </div>
        </div>
      </>
    )
  } else return null;
}

export default VoiceDetails;
