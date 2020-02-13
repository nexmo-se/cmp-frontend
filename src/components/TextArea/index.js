import React from "react";

function TextArea({ rows=4, value, setValue, label, disabled }){
  function handleChange(e){
    setValue(e.target.value);
  }

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">{label}</label>
      <div className="Vlt-textarea">
        <textarea 
          rows={rows} 
          value={value}
          onChange={handleChange} 
          disabled={disabled} 
        />
      </div>
    </div>
  )
}
export default TextArea;