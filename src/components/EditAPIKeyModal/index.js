// @flow
import React from "react";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import useAPIKey from "hooks/apiKey";
import APIKey from "entities/apiKey";
import reducer, { initialState } from "./reducer";

import Button from "components/Button";
import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import SignatureMethodDropdown from "components/SignatureMethodDropdown";
import LoadingButton from "components/LoadingButton";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

type Props = {
  apiKey:APIKey,
  visible:boolean,
  setVisible:Function,
  onEdited?:Function
}

function EditAPIKeyModal({ apiKey, visible, setVisible, onEdited }:Props){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mAPI = useAPIKey(token);

  function handleCancel(){
    setVisible(false);
  }

  function handleNameChange(value){
    dispatch({ type: "NAME_CHANGE", value });
  }

  async function handleEdit(){
    try{
      setIsAdding(true);
      const key = new APIKey({
        id: state.id,
        name: state.name
      });
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

  React.useEffect(() => {
    dispatch({ type: "INITIAL_STATE", value: apiKey });
  }, [ apiKey ]);

  React.useEffect(() => {
    dispatch({ type: "CHECK_CLEAN" })
  }, [ state.name ])

  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Edit API Key</h4>
      </ModalHeader>
      <ModalContent>
        <TextInput 
          label="Name" 
          value={state.name}
          setValue={handleNameChange}
        />
        <TextInput label="API Key" value={state.apiKey} disabled />
        <PasswordInput label="API Secret" value="*****" disabled />
      </ModalContent>
      <ModalFooter>
        <Button 
          type="tertiary" 
          onClick={handleCancel}
          disabled={isAdding}
        >
          Cancel
        </Button>
        <LoadingButton 
          loading={isAdding} 
          disabled={!state.isClean}
          onClick={handleEdit}
        >
          Edit
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default EditAPIKeyModal