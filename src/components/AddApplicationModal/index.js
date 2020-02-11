import React from "react";

import Application from "entities/application";
import APIKey from "entities/apiKey";

import useAPIKey from "hooks/apiKey";
import useApplication from "hooks/application";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Modal from "components/Modal";
import ModalContent from "components/Modal/ModalContent";
import ModalHeader from "components/Modal/ModalHeader";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import TextInput from "components/TextInput";
import Dropdown from "components/Dropdown";
import FileInput from "components/FileInput";

function AddApplicationModal({ visible, setVisible, onAdded }){
  const [ name, setName ] = React.useState("");
  const [ applicationId, setApplicationId ] = React.useState("");
  const [ privateKey, setPrivateKey ] = React.useState(null);
  const [ apiKey, setAPIKey ] = React.useState("");
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mKey = useAPIKey(token);
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

  React.useEffect(() => {
    mKey.list();
  }, []);

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
          <Dropdown label="API Key" value={apiKey} setValue={setAPIKey}>
            <option>--- Please Select ---</option>
            {mKey.data.map((apiKey) => {
              return (
                <option value={apiKey.id} key={apiKey.id}>
                  {apiKey.name} ({apiKey.key})
                </option>
              )
            })}
          </Dropdown>
        </form>
      </ModalContent>
      <ModalFooter>
        <Button type="tertiary" disabled={isAdding} onClick={handleCancel}>Cancel</Button>
        <Button type="primary" onClick={handleAddNew} disabled={isAdding}>
          {isAdding?(
            <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
          ): null}
          Add New
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default AddApplicationModal;