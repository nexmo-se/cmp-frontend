// @flow
import React from "react";
import clsx from "clsx";

type Props = {
  label:string,
  hint?:string,
  value?:string,
  setValue?:Function,
  children:any,
  className?:any,
  containerStyle?:any,
  selectStyle?:any,
}

function Dropdown({ 
  label, 
  hint, 
  value, 
  setValue, 
  children, 
  className,
  containerStyle={ width: "100%" }, 
  selectStyle={ width: "100%" },
  ...props
}:Props){
  function handleChange(e){
    if(setValue) setValue(e.target.value);
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
          {...props}
          style={selectStyle} 
          value={value} 
          onChange={handleChange} 
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

