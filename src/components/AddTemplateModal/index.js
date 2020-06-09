// @flow
import React from "react";
import reducer, { initialState } from "./reducer";

import Channel from "entities/channel";
import Template from "entities/template";

import useChannel from "hooks/channel";
import useTemplate from "hooks/template";
import useError from "hooks/error";
import useUser from "hooks/user";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

import FullPageSpinner from "components/FullPageSpinner";
import Button from "components/Button";
import LoadingButton from "components/LoadingButton";
import TextInput from "components/TextInput";
import ChannelDropdown from "components/ChannelDropdown";
import TemplateType from "components/TemplateType";

import ViberTemplateInput from "components/TemplateInput/ViberTemplateInput";
import TextTemplateInput from "components/TemplateInput/TextTemplateInput";
import WhatsAppTextTemplateInput from "components/TemplateInput/Whatsapp/TextTemplateInput";

type Props = {
  refreshToken:string,
  visible:boolean,
  setVisible:Function,
  onAdded?:Function
}

function AddTemplateModal({ refreshToken, visible, setVisible, onAdded }:Props){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const [ currentChannel, setCurrentChannel ] = React.useState(null);
  const mUser = useUser();
  const mChannel = useChannel(mUser.token);
  const mTemplate = useTemplate(mUser.token);
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

  async function handleChannelChange(channel){ 
    try{
      dispatch({ type: "CHANGE_CHANNEL", value: channel });
      dispatch({ type: "LOADING_CHANNEL" });
      setCurrentChannel(null);
      const foundChannel = await mChannel.retrieve(channel);    
      setCurrentChannel(foundChannel);
    }catch(err){
      mError.throwError(err);
    }finally{
      dispatch({ type: "LOADED_CHANNEL" })
    }
  }

  async function handleAddNew(e){
    try{
      e.preventDefault();
      setIsAdding(true);
      const newTemplate = new Template({
        ...state.content,
        channel: state.channel,
        name: state.name,
        mediaType: state.mediaType
      });
      console.log(newTemplate);
      // await mTemplate.create(newTemplate);
      dispatch({ type: "CLEAR_INPUT" });
      setCurrentChannel();
      if(onAdded) onAdded();
    }catch(err){
      mError.throwError(err);
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
          <TextInput label="Name" value={state.name} setValue={handleNameChange}/>
          <ChannelDropdown 
            label="Channel" 
            value={state.channel} 
            onChange={handleChannelChange} 
            refreshToken={refreshToken}
          />
          {currentChannel? (
            <TemplateType 
              channel={currentChannel} 
              onMediaTypeChange={handleMediaTypeChange}
              onContentChange={handleContentChange}
              content={state.content}
            />
          ): state.loadingChannel? <FullPageSpinner />: null}
        </ModalContent>
        <ModalFooter>
          <Button type="tertiary" onClick={handleCancel} disabled={isAdding}>Cancel</Button>
          <LoadingButton 
            loading={isAdding} 
            onClick={handleAddNew} 
            buttonType="submit"
          >
            Add New
          </LoadingButton>
        </ModalFooter>
      </Modal>
    </form>
  )
}
export default AddTemplateModal;