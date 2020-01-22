import React from "react";

function Dropdown(props){
  const { label, hint, value, children } = props;

  const handleChange = (e) => props.onChange(e.target.value);

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">{label}</label>
      <div className="Vlt-native-dropdown">
        <select value={value} onChange={handleChange}>
          {children}
        </select>
      </div>
      <small className="Vlt-form__element__hint">{hint}</small>
    </div>
  )
}
export default Dropdown;

