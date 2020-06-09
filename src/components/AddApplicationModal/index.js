// @flow
import React from "react";

import Application from "entities/application";
import APIKey from "entities/apiKey";

import useApplication from "hooks/application";
import useUser from "hooks/user";
import useError from "hooks/error";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";

import LoadingButton from "components/LoadingButton";
import Button from "components/Button";
import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import APIKeyDropdown from "components/APIKeyDropdown";

type Props = {
  refreshToken?:string,
  visible:boolean,
  setVisible:Function,
  onAdded?:Function,
  apiKey?:APIKey,
  disableAPIKey?:boolean
}

function AddApplicationModal({ 
  refreshToken, 
  visible, 
  setVisible, 
  onAdded, 
  disableAPIKey,
  apiKey:initialKey 
}:Props){
  const [ isClean, setIsClean ] = React.useState<boolean>(false);
  const [ name, setName ] = React.useState<string>("");
  const [ applicationId, setApplicationId ] = React.useState<string>("");
  const [ privateKey, setPrivateKey ] = React.useState<Blob|void>();
  const [ apiKey, setAPIKey ] = React.useState<APIKey|void>();
  const [ isAdding, setIsAdding ] = React.useState(false);
  const mUser = useUser();
  const mError = useError();
  const mApplication = useApplication(mUser.token);

  function handleCancel(e){
    e.preventDefault();
    setVisible(false);
  }

  function extractPrivateKey():Promise<any>{
    return new Promise((resolve, reject) => {
      if(!privateKey) return reject(new Error("Private key is not defined"));
      const reader = new FileReader();
      reader.readAsText(privateKey, "utf-8");
      reader.onload = (e) => {
        if(!reader.result) return reject(new Error());
        else return resolve(reader.result);
      }
      reader.onerror = (e) => reject(e);
    })
  }

  async function handleAddNew(e){
    try{
      setIsAdding(true);
      e.preventDefault();
      const privateKey = btoa(await extractPrivateKey());
      const newApplication = new Application({ name, applicationId, apiKey, privateKey });
      await mApplication.create(newApplication);
      if(onAdded) onAdded();
    }catch(err){
      mError.throwError(err);
    }finally{
      setVisible(false);
      setIsAdding(false);
    }
  }

  React.useEffect(() => {
    setAPIKey(initialKey);
  }, [ initialKey ]);

  React.useEffect(() => {
    const nameValid = !!name;
    const applicationIdValid = !!applicationId;
    const privateKeyValid = !!privateKey;
    setIsClean(nameValid && applicationIdValid && privateKeyValid);
  }, [ name, applicationId, privateKey ])

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
            disabled={disableAPIKey}
            value={apiKey} 
            onChange={setAPIKey} 
            refreshToken={refreshToken}
          />
        </form>
      </ModalContent>
      <ModalFooter>
        <Button 
          type="tertiary" 
          disabled={isAdding} 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <LoadingButton 
          disabled={!isClean}
          loading={isAdding} 
          onClick={handleAddNew}
        >
          Add New
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default AddApplicationModal;