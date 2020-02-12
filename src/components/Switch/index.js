import React from "react";

function Switch({ label, value, setValue, disabled }){

  function handleChange(e){
    setValue(e.target.checked);
  }

  return (
    <div className="Vlt-form__element">
      <div className="Vlt-label">
        <label>{label}</label>
      </div>
      <div className="Vlt-switch">
        <label>
          <input type="checkbox" checked={value} onChange={handleChange} disabled={disabled} />
          <span className="Vlt-switch__slider" />
        </label>
      </div>
    </div>
  )
}
export default Switch;