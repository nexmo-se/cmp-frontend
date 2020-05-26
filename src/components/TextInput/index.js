// @flow
import React from "react";

type Props = {
  label:string,
  hint?:string,
  value:string,
  setValue:Function
}

function TextInput({ label, hint, value, setValue, ...props }:Props){
  function handleChange(e){
    setValue(e.target.value);
  }

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">
        {label}
      </label>
      <div className="Vlt-input">
        <input 
          {...props}
          type="text" 
          value={value} 
          onChange={handleChange}
        />
      </div>
      <small className="Vlt-form__element__hint">
        {hint}
      </small>
    </div>
  );
}
export default TextInput;