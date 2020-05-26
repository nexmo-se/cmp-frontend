import React from "react";
import clsx from "clsx";

function Dropdown({ 
  label, 
  hint, 
  value, 
  setValue, 
  children, 
  className,
  containerStyle={ width: "100%" }, 
  selectStyle={ width: "100%" },
  disabled=false 
}){
  function handleChange(e){
    setValue(e.target.value);
  } 

  return (
    <div className={clsx(
      "Vlt-form__element",
      className
    )}>
      <label className="Vlt-label">
        {label}
      </label>
      <div style={containerStyle} className="Vlt-native-dropdown Vlt-native-dropdown--app">
        <select 
          style={selectStyle} 
          value={value} 
          onChange={handleChange} 
          disabled={disabled}
        >
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

