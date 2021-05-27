import { useForm } from "../Form";

import ApiKeyInput from "../ApiKeyInput";
import TpsInput from "../TpsInput";

function NumberInsightDetails () {
  const { channel } = useForm();

  if (channel === "number_insight") {
    return (
      <div className="Vlt-grid Vlt-grid--narrow">
        <div className="Vlt-col Vlt-col--A">
          <TpsInput />
        </div>
        <div className="Vlt-col Vlt-col--A">
          <ApiKeyInput />
        </div>
      </div>
    )
  } else return null;
}

export default NumberInsightDetails;
