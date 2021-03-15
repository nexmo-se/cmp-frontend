// @flow
import React from "react";
import reducer, { initialState } from "./reducer";

import Channel from "entities/channel";
import SuccessMessage from "entities/success";
import Template from "entities/template";

import useTemplate from "hooks/template";
import useUser from "hooks/user";
import useError from "hooks/error";
import { useParams } from "react-router-dom";

import LoadingButton from "components/LoadingButton";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";
import ChannelDropdown from "components/ChannelDropdown";
import TemplateType from "components/TemplateType";

interface EditProps {
  template: Template;
}

function EditCard ({ template }: EditProps) {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const mUser = useUser();
  const mError = useError();
  const mTemplate = useTemplate(mUser.token);
  const mParams = useParams();

  function handleNameChange(value){
    dispatch({ type: "CHANGE_NAME", value });
  }

  function handleMediaTypeChange(mediaType:string){
    dispatch({ type: "CHANGE_MEDIA_TYPE", value: mediaType });
  }

  function handleContentChange(content:string){
    dispatch({ type: "CHANGE_CONTENT", value: content });
  }

  async function handleEditClick(){
    try{
      dispatch({ type: "START_EDITING" });
      const newTemplate = new Template({
        body: state.content.body,
        whatsappTemplateName: state.content.whatsappTemplateName,
        whatsappTemplateNamespace: state.content.whatsappTemplateNamespace,
        id: mParams.templateId,
        channel: state.channel,
        name: state.name,
        mediaType: state.mediaType
      })
      
      await mTemplate.update(newTemplate);
      mError.throwSuccess(new SuccessMessage("Template has been edited"));
    }catch(err){
      mError.throwError(err);
    }finally{
      dispatch({ type: "FINISH_EDITING" })
    }
  }

  React.useEffect(() => {
    dispatch({ type: "INIT_VALUES", value: template})
  }, [ template ])

  if(!state.channel) return null;
  else return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__header">
        <h4>Edit Template</h4>
      </div>
      <div className="Vlt-card__content">
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-grid__separator">
            <TextInput 
              label="Name" 
              value={state.name}
              setValue={handleNameChange}
            />
          </div>
          <div className="Vlt-col Vlt-grid__separator">
            <ChannelDropdown 
              label="Channel"
              value={state.channel}
              disabled
            />
          </div>
          <div className="Vlt-grid__separator" />
          <div className="Vlt-col Vlt-grid__separator">
            <TemplateType 
              mediaType={state.mediaType}
              channel={state.channel} 
              onMediaTypeChange={handleMediaTypeChange}
              onContentChange={handleContentChange}
              content={state.content}
            />
          </div>
          <div className="Vlt-col Vlt-right">
            <LoadingButton onClick={handleEditClick} loading={state.isEditing}>
              Edit
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditCard;