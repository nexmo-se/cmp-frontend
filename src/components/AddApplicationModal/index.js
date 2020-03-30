import React from "react";

import Application from "entities/application";
import APIKey from "entities/apiKey";

import useApplication from "hooks/application";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

import LoadingButton from "components/LoadingButton";
import Button from "components/Button";
import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import APIKeyDropdown from "components/APIKeyDropdown";

function AddApplicationModal({ refreshToken, visible, setVisible, onAdded }){
  const [ name, setName ] = React.useState("");
  const [ applicationId, setApplicationId ] = React.useState("");
  const [ privateKey, setPrivateKey ] = React.useState(null);
  const [ apiKey, setAPIKey ] = React.useState("");
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mApplication = useApplication(token);

  function handleCancel(e){
    e.preventDefault();
    setVisible(false);
  }

  function extractPrivateKey(){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(privateKey, "utf-8");
      reader.onload = function(e){
        resolve(e.target.result);
      }

      reader.onerror = function(e){
        reject(e);
      }
    })
  }

  async function handleAddNew(e){
    try{
      setIsAdding(true);
      e.preventDefault();
      const privateKeyContent = await extractPrivateKey();
      const application = new Application();
      application.name = name;
      application.applicationId = applicationId;
      application.apiKey = new APIKey(apiKey);
      application.privateKey = btoa(privateKeyContent);
      await mApplication.create(application);
      if(onAdded) onAdded();
    }catch(err){
      throwError(err);
    }finally{
      setVisible(false);
      setIsAdding(false);
    }
  }

  return (
    <Modal visible={visible}>
      <ModalHeader setVisible={setVisible}>
        <h4>Add New Application</h4>
      </ModalHeader>
      <ModalContent>
        <form>
          <TextInput label="Name" value={name} setValue={setName} />
          <TextInput label="Application ID" value={applicationId} setValue={setApplicationId} />
          <FileInput label="Private Key" setFile={setPrivateKey} />
          <APIKeyDropdown 
            label="API Key"
            value={apiKey} 
            setValue={setAPIKey} 
            refreshToken={refreshToken}
          />
        </form>
      </ModalContent>
      <ModalFooter>
        <Button type="tertiary" disabled={isAdding} onClick={handleCancel}>Cancel</Button>
        <LoadingButton loading={isAdding} onClick={handleAddNew}>
          Add New
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default AddApplicationModal;