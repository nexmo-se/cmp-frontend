// @flow
import React from "react";
import moment from "moment-timezone";

import Campaign from "entities/campaign";
import useCampaign from "hooks/campaign";
import reducer, { initialState } from "./reducer";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

import LoadingButton from "components/LoadingButton";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Switch from "components/Switch";
import TimezoneDropdown from "components/TimezoneDropdown";
import TimePicker from "components/TimePicker";
import DatePicker from "components/DatePicker";

function AddCampaignModal({ initState, visible, setVisible, onAdded }){
  const [ state, dispatch ] = React.useReducer(reducer, initialState)
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mCampaign = useCampaign(token);
  const {
    name,
    fromDate,
    fromTime,
    toDate,
    toTime,
    activeStartTime,
    activeEndTime,
    activeOnWeekends,
    timezone
  } = state;

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value });
  }

  function handleCancel(){
    setVisible(false);
  }

  async function handleAddNew(e){
    try{
      e.preventDefault();
      setIsAdding(true);

      const startDate = `${fromDate.format("DD/MM/YYYY")} ${fromTime.format("HH:mm")}`;
      const endDate = `${toDate.format("DD/MM/YYYY")} ${toTime.format("HH:mm")}`;

      const campaign = new Campaign();
      campaign.name = name;
      campaign.campaignStartDate = new moment.tz(startDate, "DD/MM/YYYY HH:mm", timezone).toISOString(true);
      campaign.campaignEndDate = new moment.tz(endDate, "DD/MM/YYYY HH:mm", timezone).toISOString(true);
      campaign.activeStartHour = new moment(activeStartTime).format("HH");
      campaign.activeStartMinute = new moment(activeStartTime).format("mm");
      campaign.activeEndHour = new moment(activeEndTime).format("HH");
      campaign.activeEndMinute = new moment(activeEndTime).format("mm");
      campaign.activeOnWeekends = activeOnWeekends;
      campaign.timezone = timezone;
      await mCampaign.create(campaign);

      dispatch({ type: "CLEAR_INPUT" });
      if(onAdded) onAdded();
    }catch(err){
      throwError(err);
    }finally{
      setVisible(false);
      setIsAdding(false);
    }
  }

  function handleNameChange(value){ handleValueChange("name", value) }

  function handleFromDateChange(value){ handleValueChange("fromDate", value) }

  function handleFromTimeChange(value){ handleValueChange("fromTime", value) }

  function handleToDateChange(value){ handleValueChange("toDate", value) }

  function handleToTimeChange(value){ handleValueChange("toTime", value) }
  
  function handleActiveStartTimeChange(value){ handleValueChange("activeStartTime", value) }

  function handleActiveEndTimeChange(value){ handleValueChange("activeEndTime", value) }

  function handleActiveOnWeekendsChange(value){ handleValueChange("activeOnWeekends", value) }

  function handleTimezoneChange(value){ handleValueChange("timezone", value) }

  React.useEffect(() => {
    if(initState){
      dispatch({ type: "SET_INITIAL", value: initState })
    }
  }, [ initState ]);

  return (
    <Modal visible={visible}>
      <form>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Campaign</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput label="Name" value={name} setValue={handleNameChange} />

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DatePicker 
                label="From Date"
                hint="Date format: DD/MM/YYYY"
                value={fromDate}
                setValue={handleFromDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="From Time"
                hint="24hrs time format: HH:mm"
                value={fromTime}
                setValue={handleFromTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DatePicker 
                label="To Date" 
                hint="Date format: DD/MM/YYYY" 
                value={toDate}
                setValue={handleToDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="To Time" 
                hint="24hrs time format: HH:mm" 
                value={toTime}
                setValue={handleToTimeChange}
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
                hint="Time format: HH:mm"
                value={activeStartTime}
                setValue={handleActiveStartTimeChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="End Time"
                hint="24hrs time format: HH:mm"
                value={activeEndTime}
                setValue={handleActiveEndTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Volt-col--A">
              <Switch 
                label="Active on Weekends"
                value={activeOnWeekends}
                setValue={handleActiveOnWeekendsChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimezoneDropdown 
                label="Timezone"
                value={timezone}
                setValue={handleTimezoneChange}
              />
            </div>
          </div>

        </ModalContent>
        <ModalFooter>
          <Button type="tertiary" disabled={isAdding} onClick={handleCancel}>Cancel</Button>
          <LoadingButton loading={isAdding} onClick={handleAddNew}>
            Add New
          </LoadingButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default AddCampaignModal;