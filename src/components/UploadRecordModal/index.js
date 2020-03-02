import React from "react";

import useRecord from "hooks/record";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import FileInput from "components/FileInput";

function UploadRecordModal({ visible, setVisible, onUploaded }){
  const [ file, setFile ] = React.useState(null);
  const [ isUploading, setIsUploading ] = React.useState(false);
  const { throwError, throwSuccess } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mRecord = useRecord(token);
  
  function handleCancel(){
    setVisible(false);
  }

  async function handleUpload(){
    try{
      setIsUploading(true);
      await mRecord.uploadCSV(file);
      throwSuccess("File uploaded!");
      if(onUploaded) onUploaded();
    }catch(err){
      throwError(err);
    }finally{
      setVisible(false);
      setIsUploading(false);
      setFile(null);
    }
  }
  
  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Upload Records</h4>
      </ModalHeader>
      <ModalContent>
        <FileInput label="CSV Template" setFile={setFile}/>
      </ModalContent>
      <ModalFooter>
        <Button 
          type="tertiary" 
          onClick={handleCancel}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button 
          type="primary" 
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading?(
            <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white"/>
          ): null}
          Upload
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default UploadRecordModal;