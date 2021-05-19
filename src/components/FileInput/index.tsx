import lodash from "lodash";
import { MouseEvent } from "react";
import { useState, useRef } from "react";

interface FileInputProps {
  label: string;
  setFile: (file?: File) => void;
}

function FileInput ({ label, setFile }: FileInputProps) {
  const [fileName, setFileName] = useState("Choose file...");
  const realInput = useRef<HTMLInputElement>(null);

  function handleClick (e: MouseEvent<HTMLButtonElement>) {
    if (!realInput.current) return;

    e.preventDefault();
    realInput.current.click();
  }

  function handleChange () {
    if (!realInput.current) return;
    if (!realInput.current.files) return;

    if (realInput.current.files.length > 0) {
      const selectedFile = lodash(realInput.current).get("files[0]");
      if (!selectedFile) {
        setFile(undefined);
        setFileName("Chose file...");
      }

      setFileName(selectedFile.name);
      setFile(selectedFile);
    } else {
      setFile(undefined);
      setFileName("Choose file...");
    }
  }

  return (
    <>
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
            <input type="text" value={fileName} disabled />
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
    </>
  )
}
export default FileInput;