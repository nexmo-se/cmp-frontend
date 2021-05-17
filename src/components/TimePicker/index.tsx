import { Dispatch, SetStateAction } from "react";
import { DateTime } from "luxon";

import useStyles from "./styles";
import { useState } from "react";

import TextInput from "components/TextInput";
import { TimePicker as MuiTimePicker } from "@material-ui/pickers";

interface TimePickerProps {
  label: string;
  hint: string;
  value: DateTime;
  setValue: Dispatch<SetStateAction<DateTime>>;
}

function TimePicker ({ label, hint, value, setValue }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const mStyles = useStyles();

  function handleClick () {
    setOpen(true);
  }

  function handleChange (value: DateTime) {
    setOpen(false);
    if(setValue) setValue(value)
  }

  return (
    <>
      <MuiTimePicker
        ampm={false}
        className={mStyles.invisible}
        open={open} 
        onChange={handleChange}
        value={value}
        autoOk
      />
      <TextInput 
        label={label}
        hint={hint}
        value={value.toLocaleString(DateTime.TIME_SIMPLE)}
        setValue={setValue}
        onClick={handleClick}
      />
    </>
  );
}
export default TimePicker;