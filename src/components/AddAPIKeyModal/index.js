import React from "react";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import useAPIKey from "hooks/apiKey";
import APIKey from "entities/apiKey";
import reducer, { initialState } from "components/AddAPIKeyModal/reducer";

import Button from "components/Button";
import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";
import SignatureMethodDropdown from "components/SignatureMethodDropdown";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";

function AddAPIKeyModal({ visible, setVisible, onAdded }){
  const [ state, dispatch ] = React.useReducer(reducer, initialState);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mAPI = useAPIKey(token);
  const {
    name, 
    apiKey,
    apiSecret,
    signatureSecret,
    signatureMethod
  } = state;

  function handleCancel(){
    setVisible(false);
  }

  function handleValueChange(valueName, value){
    dispatch({ type: "CHANGE_VALUE", valueName, value })
  }

  function handleNameChange(value){ handleValueChange("name", value) }

  function handleAPIKeyChange(value){ handleValueChange("apiKey", value) }

  function handleAPISecretChange(value){ handleValueChange("apiSecret", value) }
  
  function handleSignatureSecretChange(value) { handleValueChange("signatureSecret", value) }

  function handleSignatureMethodChange(value){ handleValueChange("signatureMethod", value) }

  async function handleAddNew(){
    try{
      setIsAdding(true);
      const key = new APIKey(null, name, apiKey, apiSecret);
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

  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Add New API Key</h4>
      </ModalHeader>
      <ModalContent>
        <TextInput 
          label="Name" 
          value={name}
          setValue={handleNameChange}
        />
        <TextInput 
          label="API Key" 
          value={apiKey}
          setValue={handleAPIKeyChange}
        />
        <PasswordInput 
          label="API Secret" 
          value={apiSecret}
          setValue={handleAPISecretChange}
        />
        <PasswordInput 
          label="Signature Secret" 
          value={signatureSecret}
          setValue={handleSignatureSecretChange}
          disabled
        />
        <SignatureMethodDropdown 
          label="Signature Method" 
          value={signatureMethod} 
          setValue={handleSignatureMethodChange}
          disabled
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
        <Button 
          type="secondary"
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
  )
}
export default AddAPIKeyModal