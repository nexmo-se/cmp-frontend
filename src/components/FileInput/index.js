import React from "react";

function FileInput({ label, setFile=() => {} }){
  const [ fileName, setFileName ] = React.useState("Choose file...");
  const realInput = React.useRef();

  function handleClick(e){
    e.preventDefault();
    realInput.current.click();
  }

  function handleChange(){
    if(realInput.current.files?.length > 0){
      const [ selectedFile ] = realInput.current.files;
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }else{
      setFile(null);
      setFileName("Choose file...");
    }
  }

  return (
    <React.Fragment>
      <input 
        ref={realInput} 
        type="file" 
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <div className="Vlt-form__element">
        <label className="Vlt-label">
          {label}
        </label>
        <div className="Vlt-composite">
          <div className="Vlt-input">
            <input type="text" value={fileName} onClick={handleClick} disabled />
          </div>
          <div className="Vlt-composite__append">
            <button 
              type="button" 
              className="Vlt-btn" 
              onClick={handleClick}
              style={{ height: "100%" }}
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default FileInput;