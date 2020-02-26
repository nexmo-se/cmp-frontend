import React from "react";

import Channel from "entities/channel";
import Template from "entities/template";

import useChannel from "hooks/channel";
import useTemplate from "hooks/template";

import reducer, { initialState } from "components/AddTemplateModal/reducer";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";
import ChannelDropdown from "components/ChannelDropdown";

function AddTemplateModal({ visible, setVisible, onAdded }){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const [ currentChannel, setCurrentChannel ] = React.useState(null);
  const {
    name,
    channel,
    whatsappTemplateNamespace,
    whatsappTemplateName,
    body
  } = state;

  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);
  const mTemplate = useTemplate(token);

  function handleCancel(){
    setVisible(false);
  }

  function handleChangeValue(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value });
  }

  function handleNameChange(value){ handleChangeValue("name", value) }

  async function handleChannelChange(value){ 
    handleChangeValue("channel", value)
    setCurrentChannel(null);
    const searchChannel = Channel.fromID(value);
    const channel = await mChannel.retrieve(searchChannel);    
    setCurrentChannel(channel.channel);
  }

  function handleWATemplateNamespaceChange(value){
    handleChangeValue("whatsappTemplateNamespace", value);
  }

  function handleWATemplateNameChange(value){
    handleChangeValue("whatsappTemplateName", value);
  }

  function handleBodyChange(value){ handleChangeValue("body", value) }

  async function handleAddNew(){
    try{
      setIsAdding(true);
      const t = new Template();
      t.name = name;
      t.channel = Channel.fromID(channel);
      t.body = (currentChannel === "sms")? body: undefined;
      t.whatsappTemplateName = (currentChannel === "whatsapp")? whatsappTemplateName: undefined;
      t.whatsappTemplateNamespace = (currentChannel === "whatsapp")? whatsappTemplateNamespace: undefined;
      
      await mTemplate.create(t);
      dispatch({ type: "CLEAR_INPUT" });
      if(onAdded) onAdded();
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
      setVisible(false);
    }
  }

  return (
    <form>
      <Modal visible={visible}>
        <ModalHeader setVisible={setVisible}>
          <h4>Add New Template</h4>
        </ModalHeader>
        <ModalContent>
          <TextInput label="Name" value={name} setValue={handleNameChange}/>
          <ChannelDropdown label="Channel" value={channel} setValue={handleChannelChange} />
          <div className="Vlt-grid Vlt-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="WhatsApp Template Namespace" 
                value={whatsappTemplateNamespace}
                setValue={handleWATemplateNamespaceChange}
                disabled={currentChannel !== "whatsapp"}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <TextInput 
                label="WhatsApp Template Name" 
                value={whatsappTemplateName}
                setValue={handleWATemplateNameChange}
                disabled={currentChannel !== "whatsapp"}
              />
            </div>
          </div>
          <TextArea 
            label="Body" 
            value={body} 
            setValue={handleBodyChange} 
            disabled={currentChannel !== "sms" && currentChannel !== "whatsapp"}
          />
        </ModalContent>
        <ModalFooter>
          <Button type="tertiary" onClick={handleCancel} disabled={isAdding}>Cancel</Button>
          <Button 
            buttonType="submit" 
            type="primary" 
            disabled={isAdding} 
            onClick={handleAddNew}
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
export default AddTemplateModal;