import React from "react";
import moment from "moment";

import SuccessMessage from "entities/success";
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
      const { campaign, template } = await mRecord.uploadCSV(file);
      throwSuccess(new SuccessMessage("File Uploaded!"));
      if(onUploaded) onUploaded(campaign, template);
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
        {file?(
          <React.Fragment>
            <p className="Vlt-truncate">File Name: {file?.name}</p>
            <p>Date: {new moment(file?.lastModifiedDate).format("DD MMMM YYYY HH:mm")}</p>
          </React.Fragment>
        ): null}
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
          type="secondary" 
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