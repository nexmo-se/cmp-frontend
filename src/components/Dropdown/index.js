import React from "react";

function Dropdown({ label, hint, value, setValue, children, disabled=false }){
  function handleChange(e){
    setValue(e.target.value);
  } 

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">
        {label}
      </label>
      <div className="Vlt-native-dropdown">
        <select value={value} onChange={handleChange} disabled={disabled}>
          {children}
        </select>
      </div>
      <small className="Vlt-form__element__hint">
        {hint}
      </small>
    </div>
  )
}
export default Dropdown;

