import React from "react";

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

function AddCampaignModal({ visible, setVisible, onAdded }){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mCampaign = useCampaign(token);
  const {
    name,
    fromDate,
    fromTime,
    toDate,
    toTime
  } = state;
  

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value });
  }

  function handleCancel(){
    setVisible(false);
  }

  function handleAddNew(){
    try{
      setIsAdding(true);

      const campaign = new Campaign();
      campaign.name = name;
      campaign.campaignStartDate = `${fromDate} ${fromTime}`;
      campaign.campaignEndDate = `${toDate} ${toTime}`;
      mCampaign.create(campaign);

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

  return (
    <form>
      <Modal visible={visible}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Campaign</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput label="Name" value={name} setValue={handleNameChange} />

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="From Date" 
                hint="Date format: dd/mm/yyyy" 
                value={fromDate}
                setValue={handleFromDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="From Time" 
                hint="Time format: hh:mm" 
                value={fromTime}
                setValue={handleFromTimeChange}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="To Date" 
                hint="Date format: dd/mm/yyyy" 
                value={toDate}
                setValue={handleToDateChange}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="To Time" 
                hint="Time format: hh:mm" 
                value={toTime}
                setValue={handleToTimeChange}
              />
            </div>
          </div>

        </ModalContent>
        <ModalFooter>
          <Button type="tertiary" disabled={isAdding} onClick={handleCancel}>Cancel</Button>
          <Button 
            type="primary" 
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
      </Modal>
    </form>
  )
}
export default AddCampaignModal;