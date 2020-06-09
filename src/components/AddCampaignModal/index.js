// @flow
import React from "react";
import moment from "moment-timezone";

import Campaign from "entities/campaign";
import useCampaign from "hooks/campaign";
import useError from "hooks/error";
import useUser from "hooks/user";
import reducer, { initialState } from "./reducer";

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

type Props = {
  campaign:Campaign,
  visible:boolean,
  setVisible:Function,
  onAdded?:Function
}

function AddCampaignModal({ campaign, visible, setVisible, onAdded }:Props){
  const [ state, dispatch ] = React.useReducer(reducer, initialState)
  const [ isAdding, setIsAdding ] = React.useState<boolean>(false);
  const mUser = useUser();
  const mError = useError();
  const mCampaign = useCampaign(mUser.token);

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

      const startDate:string = `${state.fromDate.format("DD/MM/YYYY")} ${state.fromTime.format("HH:mm")}`;
      const endDate:string = `${state.toDate.format("DD/MM/YYYY")} ${state.toTime.format("HH:mm")}`;

      const campaign = new Campaign({
        name: state.name,
        campaignStartDate: new moment.tz(startDate, "DD/MM/YYYY HH:mm", state.timezone).toISOString(true),
        campaignEndDate: new moment.tz(endDate, "DD/MM/YYYY HH:mm", state.timezone).toISOString(true),
        activeStartHour: parseInt(new moment(state.activeStartTime).format("HH")),
        activeStartMinute: parseInt(new moment(state.activeStartTime).format("mm")),
        activeEndHour: parseInt(new moment(state.activeEndTime).format("HH")),
        activeEndMinute: parseInt(new moment(state.activeEndTime).format("mm")),
        activeOnWeekends: state.activeOnWeekends,
        timezone: state.timezone
      });
      await mCampaign.create(campaign);

      dispatch({ type: "CLEAR_INPUT" });
      if(onAdded) onAdded();
    }catch(err){
      mError.throwError(err);
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
    if(campaign){
      dispatch({ type: "SET_INITIAL", value: campaign })
    }
  }, [ campaign ]);

  return (
    <Modal visible={visible}>
      <form>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Campaign</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput 
            label="Name" 
            value={state.name} 
            setValue={handleNameChange} 
          />

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DatePicker 
                label="From Date"
                hint="Date format: DD/MM/YYYY"
                value={state.fromDate}
                setValue={handleFromDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="From Time"
                hint="24hrs time format: HH:mm"
                value={state.fromTime}
                setValue={handleFromTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DatePicker 
                label="To Date" 
                hint="Date format: DD/MM/YYYY" 
                value={state.toDate}
                setValue={handleToDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="To Time" 
                hint="24hrs time format: HH:mm" 
                value={state.toTime}
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
                value={state.activeStartTime}
                setValue={handleActiveStartTimeChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimePicker 
                label="End Time"
                hint="24hrs time format: HH:mm"
                value={state.activeEndTime}
                setValue={handleActiveEndTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Volt-col--A">
              <Switch 
                label="Active on Weekends"
                value={state.activeOnWeekends}
                setValue={handleActiveOnWeekendsChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TimezoneDropdown 
                label="Timezone"
                value={state.timezone}
                setValue={handleTimezoneChange}
              />
            </div>
          </div>

        </ModalContent>
        <ModalFooter>
          <Button 
            type="tertiary" 
            disabled={isAdding} 
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <LoadingButton 
            loading={isAdding} 
            onClick={handleAddNew}
          >
            Add New
          </LoadingButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default AddCampaignModal;