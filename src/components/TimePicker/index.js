import React from "react";
import { makeStyles } from "@material-ui/styles";

import TextInput from "components/TextInput";
import { TimePicker as MuiTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles(() => ({
  invisible: { display: "none" }
}))

function DatePicker({ label, hint, value, setValue }){
  const [ open, setOpen ] = React.useState(false);
  const mStyles = useStyles();

  function handleClick(){
    setOpen(true);
  }

  function handleChange(value){
    setOpen(false);
    if(setValue) setValue(value)
  }

  return (
    <React.Fragment>
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
        value={value?.format("HH:mm")}
        setValue={setValue}
        onClick={handleClick}
      />
    </React.Fragment>
  );
}
export default DatePicker;