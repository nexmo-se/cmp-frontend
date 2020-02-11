import React from "react";

function BigInput(props){
  const { placeholder, label, hint, value } = props;

  function handleChange(e){
    props.onChange(e.target.value);
  }

  return (
    <div className="Vlt-form__element Vlt-form__element--big">
      <div className="Vlt-input">
        <input type="text" placeholder={placeholder} value={value} onChange={handleChange}/>
        <label>{label}</label>
      </div>
      <small className="Vlt-form__element__hint">{hint}</small>
    </div>
  )
}
export default BigInput;