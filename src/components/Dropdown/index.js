// @flow
import React from "react";
import clsx from "clsx";

interface DropdownProps {
  label?: string,
  hint?: string,
  value?: ?string,
  setValue?: (value: string) => void,
  children: any,
  className?: any,
  containerStyle?: any,
  selectStyle?: any,
}

function Dropdown (props: DropdownProps) {
  const { 
    label, 
    hint, 
    value, 
    setValue, 
    children, 
    className,
    containerStyle = { width: "100%" }, 
    selectStyle = { width: "100%" },
    ...others
  } = props;

  function handleChange (e) {
    if(setValue) setValue(e.target.value);
  } 

  return (
    <div
      className={
        clsx(
          "Vlt-form__element",
          className
        )
      }
    >
      <label className="Vlt-label">
        {label}
      </label>
      <div
        style={containerStyle}
        className="Vlt-native-dropdown Vlt-native-dropdown--app"
      >
        <select 
          {...others}
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

