import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SetValue = (Dispatch<SetStateAction<string>> | ((value: string) => void));
interface TextInputProps {
  label: string;
  hint?: string;
  value: string;
  setValue?: SetValue;
  onClick?: () => void;
  disabled?: boolean;
}

function TextInput ({ label, hint, value, setValue, ...props }: TextInputProps) {
  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (setValue) setValue(e.target.value);
  }

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">
        {label}
      </label>
      <div className="Vlt-input">
        <input 
          {...props}
          type="text" 
          value={value} 
          onChange={handleChange}
        />
      </div>
      <small className="Vlt-form__element__hint">
        {hint}
      </small>
    </div>
  );
}
export default TextInput;