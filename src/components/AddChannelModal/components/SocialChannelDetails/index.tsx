import { useForm } from "../Form";

import ApplicationInput from "../ApplicationInput";
import SenderIdInput from "../SenderIdInput";
import TpsInput from "../TpsInput";
import ApiKeyInput from "../ApiKeyInput";

function SocialChannelDetails () {
  const { channel } = useForm();

  if (channel === "viber" || channel === "whatsapp") {
    return (
      <>
        <div className="Vlt-grid Vlr-grid--narrow">
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

export default SocialChannelDetails;
