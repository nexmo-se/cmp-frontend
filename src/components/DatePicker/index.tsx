import { Dispatch, SetStateAction } from "react";
import { DateTime } from "luxon";

import useStyles from "./styles";
import { useState } from "react";

import TextInput from "components/TextInput";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

interface DatePickerProps {
  label: string;
  hint?: string;
  value: DateTime | null;
  setValue: Dispatch<SetStateAction<DateTime | null>>;
}

function DatePicker ({ label, hint, value, setValue }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const mStyles = useStyles();

  function handleClick (){ 
    setOpen(true);
  }

  function handleChange (value: DateTime | null) {
    setOpen(false);
    if (setValue) setValue(value)
  }

  return (
    <>
      <MuiDatePicker
        className={mStyles.invisible}
        open={open} 
        onChange={handleChange}
        value={value}
        autoOk
      />
      <TextInput 
        label={label}
        hint={hint}
        value={value?.toLocaleString(DateTime.DATE_SHORT) ?? ""}
        onClick={handleClick}
      />
    </>
  );
}
export default DatePicker;