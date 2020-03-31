import React from "react";

import Channel from "entities/channel";
import APIKey from "entities/apiKey";
import Application from "entities/application";

import useChannel from "hooks/channel";
import reducer, { initialState } from "components/AddChannelModal/reducer";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

import LoadingButton from "components/LoadingButton";
import Button from "components/Button";
import TextInput from "components/TextInput";
import Dropdown from "components/Dropdown";
import NumberInput from "components/NumberInput";
import APIKeyDropdown from "components/APIKeyDropdown";
import ApplicationDropdown from "components/ApplicationDropdown";

function AddChannelModal({ 
  disableSMS=false, 
  visible, 
  setVisible, 
  onAdded,
  refreshToken,
  apiKey:initAPIKey=""
}){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mChannel = useChannel(token);

  function handleCancel(e){
    e.preventDefault();
    setVisible(false);
  }

  function handleChannelChange(value){
    handleValueChange("channel", value);
    if(value === "whatsapp") handleValueChange("smsUseSignature", false);
  }

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value });
  }

  function handleNameChange(value){ handleValueChange("name", value) }

  function handleSenderIdChange(value){ handleValueChange("senderId", value) }

  function handleTPSChange(value){ handleValueChange("tps", value) }

  function handleAPIKeyChange(value){ handleValueChange("apiKey", value) }

  function handleApplicationChange(value){ handleValueChange("application", value) }

  async function handleAddNew(e){
    e.preventDefault();
    setIsAdding(true);
    try{
      const ch = Channel.fromJSON(state);
      ch.apiKey = new APIKey(state.apiKey);
      if(state.channel !== "sms"){
        ch.application = new Application();
        ch.application.id = state.application;
      }
      await mChannel.create(ch);
      dispatch({ type: "CLEAR_INPUT" })
      if(onAdded) onAdded()
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
      setVisible(false);
    }
  }

  React.useEffect(() => {
    if(disableSMS) dispatch({ type: "SELECT_WHATSAPP" })
    else dispatch({ type: "SELECT_SMS" })
  }, [ disableSMS ])

  React.useEffect(() => {
    handleValueChange("apiKey", initAPIKey.id)
  }, [ initAPIKey ])

  return (
    <form>
      <Modal visible={visible}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Channel</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput label="Name" value={state.name} setValue={handleNameChange} />

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <Dropdown label="Channel" value={state.channel} setValue={handleChannelChange}>
                <option>--- Please select ---</option>
                <option value="sms" disabled={disableSMS}>SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="viber">Viber</option>
              </Dropdown>
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="Sender ID" 
                value={state.senderId} 
                setValue={handleSenderIdChange} 
                disabled={!state.channel}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <NumberInput 
                label="TPS" 
                value={state.tps} 
                setValue={handleTPSChange}
                disabled={!state.channel}
              />
            </div>
          </div>

          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <APIKeyDropdown 
                label="API Key" 
                value={state.apiKey} 
                setValue={handleAPIKeyChange} 
                disabled={!state.channel}
                refreshToken={refreshToken}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <ApplicationDropdown 
                label="Application" 
                value={state.application} 
                setValue={handleApplicationChange} 
                disabled={state.channel === "sms"}
                refreshToken={refreshToken}
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button type="tertiary" onClick={handleCancel} disabled={isAdding}>Cancel</Button>
          <LoadingButton loading={isAdding} onClick={handleAddNew} buttonType="submit">
            Add New
          </LoadingButton>
        </ModalFooter>
      </Modal>
    </form>
  )
}
export default AddChannelModal;