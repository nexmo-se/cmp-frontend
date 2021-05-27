import NumberInput from "components/NumberInput";
import { useForm } from "../Form";

function TpsInput () {
  const { channel, tps, setTps } = useForm();

  return (
    <NumberInput
      label={channel === "voice"? "Call per Second (CPS)": "Throughput per Second (TPS)"}
      value={tps}
      setValue={setTps}
    />
  )
}

export default TpsInput;
