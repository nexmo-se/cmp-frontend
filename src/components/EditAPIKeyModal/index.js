import React from "react";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import useAPIKey from "hooks/apiKey";
import APIKey from "entities/apiKey";
import reducer from "components/AddAPIKeyModal/reducer";

import Button from "components/Button";
import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import SignatureMethodDropdown from "components/SignatureMethodDropdown";
import LoadingButton from "components/LoadingButton";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

function EditAPIKeyModal({ apiKey:initialValue, visible, setVisible, onEdited }){
  const [ state, dispatch ] = React.useReducer(reducer, initialValue.toJSON());
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mAPI = useAPIKey(token);
  const {
    id,
    name, 
    apiKey
  } = state;

  function handleCancel(){
    setVisible(false);
  }

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value })
  }

  function handleNameChange(value){ handleValueChange("name", value) }

  async function handleEdit(){
    try{
      setIsAdding(true);
      const key = new APIKey(id, name);
      await mAPI.update(key);
      dispatch({ type: "CLEAR_INPUT" })
      if(onEdited) onEdited();
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
      setVisible(false);
    }
  }

  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Edit API Key</h4>
      </ModalHeader>
      <ModalContent>
        <TextInput 
          label="Name" 
          value={name}
          setValue={handleNameChange}
        />
        <TextInput label="API Key" value={apiKey} disabled />
        <PasswordInput label="API Secret" value="*****" disabled />
        <PasswordInput label="Signature Secret" value="*****" disabled />
        <SignatureMethodDropdown label="Signature Method" value="*****" disabled />
      </ModalContent>
      <ModalFooter>
        <Button 
          type="tertiary" 
          onClick={handleCancel}
          disabled={isAdding}
        >
          Cancel
        </Button>
        <LoadingButton loading={isAdding} onClick={handleEdit}>
          Edit
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default EditAPIKeyModal