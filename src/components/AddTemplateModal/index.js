import React from "react";

import Channel from "entities/channel";
import Template from "entities/template";

import useChannel from "hooks/channel";
import useTemplate from "hooks/template";
import useError from "hooks/error";

import reducer, { initialState } from "components/AddTemplateModal/reducer";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

import Button from "components/Button";
import LoadingButton from "components/LoadingButton";
import TextInput from "components/TextInput";
import ChannelDropdown from "components/ChannelDropdown";

import TemplateType from "./TemplateType";
import ViberTemplateInput from "./ViberTemplateInput";
import TextTemplateInput from "./TextTemplateInput";
import WhatsAppTextTemplateInput from "./Whatsapp/TextTemplateInput";

function AddTemplateModal({ refreshToken, visible, setVisible, onAdded }){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const [ currentChannel, setCurrentChannel ] = React.useState(null);
  const {
    name,
    channel,
    mediaType,
    content, 
    loadingChannel
  } = state;

  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);
  const mTemplate = useTemplate(token);
  const mError = useError();

  function handleCancel(){
    setVisible(false);
  }

  function handleNameChange(value){ 
    dispatch({ type: "CHANGE_NAME", value });  
  }

  function handleMediaTypeChange(value){
    dispatch({ type: "CHANGE_MEDIA_TYPE", value });
  }

  function handleContentChange(value){
    dispatch({ type: "CHANGE_CONTENT", value });
  }

  async function handleChannelChange(value){ 
    try{
      dispatch({ type: "CHANGE_CHANNEL", value });
      dispatch({ type: "LOADING_CHANNEL" });
      setCurrentChannel(null);
      const searchChannel = Channel.fromID(value);
      const channel = await mChannel.retrieve(searchChannel);    
      setCurrentChannel(channel.channel);
    }catch(err){
      mError.throwError(err);
    }finally{
      dispatch({ type: "LOADED_CHANNEL" })
    }
  }

  async function handleAddNew(){
    try{
      setIsAdding(true);
      const t = new Template();
      t.name = name;
      t.channel = Channel.fromID(channel);
      
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
          <ChannelDropdown 
            label="Channel" 
            value={channel} 
            setValue={handleChannelChange} 
            refreshToken={refreshToken}
          />
          <TemplateType 
            channel={currentChannel} 
            loading={loadingChannel}
            onChange={handleMediaTypeChange} 
          />
          {
            (mediaType === "text")? <TextTemplateInput onChange={handleContentChange} />: 
            (mediaType === "viber_template")? <ViberTemplateInput onChange={handleContentChange} />:
            (mediaType === "whatsapp_text")? <WhatsAppTextTemplateInput onChange={() => {}} />: null
          }
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
export default AddTemplateModal;