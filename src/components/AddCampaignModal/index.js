import React from "react";
import moment from "moment-timezone";

import Campaign from "entities/campaign";
import useCampaign from "hooks/campaign";
import reducer, { initialState } from "components/AddCampaignModal/reducer";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Switch from "components/Switch";
import TimezoneDropdown from "components/TimezoneDropdown";

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

      const startDate = `${fromDate} ${fromTime}`;
      const endDate = `${toDate} ${toTime}`;

      const campaign = new Campaign();
      campaign.name = name;
      campaign.campaignStartDate = new moment.tz(startDate, "DD/MM/YYYY HH:mm", timezone).toISOString(true);
      campaign.campaignEndDate = new moment.tz(endDate, "DD/MM/YYYY HH:mm", timezone).toISOString(true);
      campaign.activeStartHour = new moment(activeStartTime, "HH:mm").format("HH");
      campaign.activeStartMinute = new moment(activeStartTime, "HH:mm").format("mm");
      campaign.activeEndHour = new moment(activeEndTime, "HH:mm").format("HH");
      campaign.activeEndMinute = new moment(activeEndTime, "HH:mm").format("mm");
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
              <TextInput 
                label="From Date" 
                hint="Date format: DD/MM/YYYY" 
                value={fromDate}
                setValue={handleFromDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="From Time" 
                hint="24hrs time format: hh:mm" 
                value={fromTime}
                setValue={handleFromTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="To Date" 
                hint="Date format: DD/MM/YYYY" 
                value={toDate}
                setValue={handleToDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="To Time" 
                hint="24hrs time format: hh:mm" 
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
              <TextInput 
                label="Start Time"
                hint="Time format: hh:mm"
                value={activeStartTime}
                setValue={handleActiveStartTimeChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="End Time"
                hint="24hrs time format: hh:mm"
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
          <Button 
            type="secondary" 
            buttonType="submit"
            onClick={handleAddNew}
            disabled={isAdding}
          >
            {isAdding?(
              <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
            ): null}
            Add New
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default AddCampaignModal;