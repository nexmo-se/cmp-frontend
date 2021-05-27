import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface BigInputProps {
  placeholder: string;
  label: string;
  hint?: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

function BigInput (props: BigInputProps) {
  const { placeholder, label, hint, value, onChange } = props;

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e.target.value);
  }

  return (
    <div className="Vlt-form__element Vlt-form__element--big">
      <div className="Vlt-input">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <label>{label}</label>
      </div>
      <small className="Vlt-form__element__hint">
        {hint}
      </small>
    </div>
  )
}

export default BigInput;
