import validator from "validator";
import { Dispatch, SetStateAction } from "react";

import TextInput from "components/TextInput";

interface NumberInputProps {
  label: string;
  value: number;
  setValue?: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
}

function NumberInput ({ label, value, setValue, disabled }: NumberInputProps) {
  function handleSetValue (value: string) {
    if (!setValue) return;
    if (!validator.isNumeric(value)) return;

    setValue(parseInt(value));
  }

  return (
    <TextInput 
      label={label}
      value={value.toString()}
      setValue={handleSetValue}
      disabled={disabled}
    />
  )
}
export default NumberInput;