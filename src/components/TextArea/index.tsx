import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SetValue = (Dispatch<SetStateAction<string>> | ((value: string) => void));

interface TextAreaProps {
  rows?: number;
  value: string;
  setValue?: SetValue;
  label: string;
  disabled?: boolean;
}


function TextArea ({ rows=4, value, setValue, label, disabled }: TextAreaProps) {
  function handleChange (e: ChangeEvent<HTMLTextAreaElement>) {
    if (setValue) setValue(e.target.value);
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