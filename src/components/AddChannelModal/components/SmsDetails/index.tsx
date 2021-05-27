import { useForm } from "../Form";

import SenderIdInput from "../SenderIdInput";
import TpsInput from "../TpsInput";
import ApiKeyInput from "../ApiKeyInput";

function SmsDetails () {
  const { channel } = useForm();

  if (channel === "sms") {
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
        </div>
      </>
    )
  } else return null;
}

export default SmsDetails 