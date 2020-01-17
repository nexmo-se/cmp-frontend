import React from "react";

function PasswordInput(props){
  const { label, hint, value } = props;
  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">{label}</label>
      <div className="Vlt-input">
        <input type="password" value={value}/>
      </div>
      <small className="Vlt-form__element__hint">{hint}</small>
    </div>
  );
}
export default PasswordInput;