import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SwitchProps {
  label: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
}

function Switch ({ label, value, setValue, disabled }: SwitchProps) {

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.checked);
  }

  return (
    <div className="Vlt-form__element">
      <div className="Vlt-label">
        <label>{label}</label>
      </div>
      <div className="Vlt-switch">
        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={handleChange}
            disabled={disabled}
          />
          <span className="Vlt-switch__slider" />
        </label>
      </div>
    </div>
  )
}
export default Switch;