import React from "react";
import TextInput from "components/TextInput";

function NumberInput({ label, value, setValue, disabled }){
  function handleSetValue(value){
    if(!isNaN(value)) setValue(value);
  }

  return (
    <TextInput 
      label={label}
      value={value}
      setValue={handleSetValue}
      disabled={disabled}
    />
  )
}
export default NumberInput;