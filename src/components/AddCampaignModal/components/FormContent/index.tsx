import { useForm } from "../Form";

import TextInput from "components/TextInput";
import DatePicker from "components/DatePicker";
import TimePicker from "components/TimePicker";
import Switch from "components/Switch";
import TimezoneDropdown from "components/TimezoneDropdown";

interface FormContentProps {
  type?: "default" | "number_insight";
}

function FormContent ({ type = "default" }: FormContentProps) {
  const {
    name,
    fromDate,
    fromTime,
    toDate,
    toTime,
    activeStartTime,
    activeEndTime,
    activeOnWeekends,
    timezone,
    setName,
    setFromDate,
    setFromTime,
    setToDate,
    setToTime,
    setActiveStartTime,
    setActiveEndTime,
    setActiveOnWeekends,
    setTimezone
  } = useForm();

  return (
    <>
      <TextInput 
        label="Name" 
        value={name} 
        setValue={setName} 
      />
      {
        type === "default" && (
          <>
            <div className="Vlt-grid Vlt-grid--narrow">
              <div className="Vlt-col Vlt-col--A">
                <DatePicker 
                  label="From Date"
                  value={fromDate}
                  setValue={setFromDate}
                />
              </div>
              <div className="Vlt-col Vlt-col--A">
                <TimePicker 
                  label="From Time"
                  value={fromTime}
                  setValue={setFromTime}
                />
              </div>
            </div>

            <div className="Vlt-grid Vlt-grid--narrow">
              <div className="Vlt-col Vlt-col--A">
                <DatePicker 
                  label="To Date"
                  value={toDate}
                  setValue={setToDate}
                />
              </div>
              <div className="Vlt-col Vlt-col--A">
                <TimePicker 
                  label="To Time"
                  value={toTime}
                  setValue={setToTime}
                />
              </div>
            </div>

            <div className="Vlt-text-separator">
              <span>Daily Campaign Configuration</span>
            </div>

            <div className="Vlt-grid VLt-grid--narrow">
              <div className="Vlt-col Vlt-col--A">
                <TimePicker 
                  label="Start Time"
                  value={activeStartTime}
                  setValue={setActiveStartTime}
                />
              </div>
              <div className="Vlt-col Vlt-col--A">
                <TimePicker 
                  label="End Time"
                  value={activeEndTime}
                  setValue={setActiveEndTime}
                />
              </div>
            </div>

            <div className="Vlt-grid Vlt-grid--narrow">
              <div className="Vlt-col Volt-col--A">
                <Switch 
                  label="Active on Weekends"
                  value={activeOnWeekends}
                  setValue={setActiveOnWeekends}
                />
              </div>
              <div className="Vlt-col Vlt-col--A">
                <TimezoneDropdown 
                  label="Timezone"
                  value={timezone}
                  setValue={setTimezone}
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default FormContent;
