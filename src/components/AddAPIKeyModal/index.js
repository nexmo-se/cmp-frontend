// @flow
import React from "react";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import useAPIKey from "hooks/apiKey";
import APIKey from "entities/apiKey";
import reducer, { initialState } from "components/AddAPIKeyModal/reducer";

import Button from "components/Button";
import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import LoadingButton from "components/LoadingButton";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

type Props = {
  visible:boolean,
  setVisible:Function,
  onAdded?:Function
}

function AddAPIKeyModal({ visible, setVisible, onAdded }:Props){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mAPI = useAPIKey(token);

  function handleCancel(){
    setVisible(false);
  }

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value })
  }

  function handleNameChange(value){ handleValueChange("name", value) }

  function handleAPIKeyChange(value){ handleValueChange("apiKey", value) }

  function handleAPISecretChange(value){ handleValueChange("apiSecret", value) }

  async function handleAddNew(){
    try{
      setIsAdding(true);
      const key = new APIKey({
        name: state.name,
        apiKey: state.apiKey,
        apiSecret: state.apiSecret
      });

      await mAPI.create(key);
      dispatch({ type: "CLEAR_INPUT" })
      if(onAdded) onAdded();
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
      setVisible(false);
    }
  }

  React.useEffect(() => {
    dispatch({ type:"CHECK_CLEAN" });
  }, [ state.name, state.apiKey, state.apiSecret ])

  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Add New API Key</h4>
      </ModalHeader>
      <ModalContent>
        <TextInput 
          label="Name" 
          value={state.name}
          setValue={handleNameChange}
        />
        <TextInput 
          label="API Key" 
          value={state.apiKey}
          setValue={handleAPIKeyChange}
        />
        <PasswordInput 
          label="API Secret" 
          value={state.apiSecret}
          setValue={handleAPISecretChange}
        />
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
          disabled={!state.isClean}
          loading={isAdding} 
          onClick={handleAddNew}
        >
          Add New
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default AddAPIKeyModal