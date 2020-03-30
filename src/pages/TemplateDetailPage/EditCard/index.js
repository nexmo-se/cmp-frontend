import React from "react";

import Channel from "entities/channel";
import SuccessMessage from "entities/success";
import Template from "entities/template";

import useTemplate from "hooks/template";
import useUser from "hooks/user";
import useError from "hooks/error";

import LoadingButton from "components/LoadingButton";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";
import ChannelDropdown from "components/ChannelDropdown";

import reducer, { initialState } from "./reducer";

function EditCard({ template }) {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const mUser = useUser();
  const mError = useError();
  const mTemplate = useTemplate(mUser.token);

  function handleNameChange(value){
    dispatch({ type: "CHANGE_NAME", value });
  }

  function handleBodyChange(value){
    dispatch({ type: "CHANGE_BODY", value })
  }

  async function handleEditClick(){
    try{
      dispatch({ type: "START_EDITING" });
      const t = Template.fromJSON(state);
      await mTemplate.update(t);
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

  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__header">
        <h4>Edit Template</h4>
      </div>
      <div className="Vlt-card__content">
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-grid__separator">
            <TextInput 
              label="Name" 
              value={state?.name}
              setValue={handleNameChange}
            />
          </div>
          <div className="Vlt-col Vlt-grid__separator">
            <ChannelDropdown 
              label="Channel"
              value={state?.channel?.id}
              disabled
            />
          </div>
          <div className="Vlt-col Vlt-col--A">
            <TextInput 
              label="Whatsapp Template Namespace" 
              value={state?.whatsappTemplateNamespace}
              disabled
            />
          </div>
          <div className="Vlt-col Vlt-col--A">
            <TextInput 
              label="Whatsapp Template Name" 
              value={state?.whatsappTemplateName}
              disabled
            />
          </div>
          <div className="Vlt-grid__separator" />
          <div className="Vlt-col Vlt-grid__separator">
            <TextArea 
              label="Body" 
              value={state?.body}
              setValue={handleBodyChange}
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