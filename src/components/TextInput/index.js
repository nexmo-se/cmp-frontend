import React from "react";

function TextInput(props){
  const { label, hint, value } = props;
  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">{label}</label>
      <div className="Vlt-input">
        <input type="text" value={value}/>
      </div>
      <small className="Vlt-form__element__hint">{hint}</small>
    </div>
  );
}
export default TextInput;