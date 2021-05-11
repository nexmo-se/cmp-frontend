import { Dispatch, SetStateAction } from "react";

interface PasswordInputProps {
  label: string;
  hint: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}

function PasswordInput ({ label, hint, value, setValue, disabled }) {
  function handleChange (e) {
    setValue(e.target.value);
  }

  return (
    <div className="Vlt-form__element">
      <label className="Vlt-label">
        {label}
      </label>
      <div className="Vlt-input">
        <input 
          type="password" 
          value={value} 
          onChange={handleChange} 
          disabled={disabled} 
        />
      </div>
      <small className="Vlt-form__element__hint">
        {hint}
      </small>
    </div>
  );
}

export default PasswordInput;
