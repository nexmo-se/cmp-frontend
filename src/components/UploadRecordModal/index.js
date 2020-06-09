// @flow
import React from "react";
import moment from "moment";

import SuccessMessage from "entities/success";
import Campaign from "entities/campaign";
import Template from "entities/template";

import useRecord from "hooks/record";
import useTemplate from "hooks/template";

import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import FileInput from "components/FileInput";
import LoadingButton from "components/LoadingButton";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";

type Props = {
  campaign?:Campaign,
  template?:Template,
  visible:boolean,
  disableCampaign?:boolean,
  setVisible:Function,
  onUploaded?:Function
}

function UploadRecordModal({ 
  visible, 
  setVisible, 
  onUploaded, 
  disableCampaign,
  campaign:initialCampaign, 
  template:initialTemplate 
}:Props){
  const [ file, setFile ] = React.useState(null);
  const [ isUploading, setIsUploading ] = React.useState(false);
  const [ selectedCampaign, setSelectedCampaign ] = React.useState<Campaign|void>(initialCampaign);
  const [ selectedTemplate, setSelectedTemplate ] = React.useState<Template|void>(initialTemplate);
  const [ isClean, setIsClean ] = React.useState<boolean>(false);
  const { throwError, throwSuccess } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mRecord = useRecord(token);
  const mTemplate = useTemplate(token);
  
  function handleCancel(){
    setVisible(false);
  }

  async function handleUpload(){
    try{
      setIsUploading(true);
      if(!selectedCampaign) throw new Error("Please complete the form");
      if(!selectedTemplate) throw new Error("Please complete the form");
      if(!file) throw new Error("Please complete the form");

      const foundTemplate = await mTemplate.retrieve(selectedTemplate);
      await mRecord.createMetadata(selectedCampaign, foundTemplate);
      await mRecord.uploadCSV(selectedCampaign, selectedTemplate, file);
      throwSuccess(new SuccessMessage("File uploaded!"));
      if(onUploaded) onUploaded(selectedCampaign, selectedTemplate);
    }catch(err){
      throwError(err);
    }finally{
      setVisible(false);
      setIsUploading(false);
      setFile(null);
    }
  }

  React.useEffect(() => {
    if(selectedCampaign, selectedTemplate, file){
      setIsClean(true);
    }else setIsClean(false);
  }, [ selectedCampaign, selectedTemplate, file ])
  
  return (
    <Modal visible={visible} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Upload Records</h4>
      </ModalHeader>
      <ModalContent>
        <CampaignDropdown 
          label="Campaign"
          value={selectedCampaign}
          onChange={setSelectedCampaign}
          disabled={disableCampaign}
        />
        <TemplateDropdown 
          label="Template"
          value={selectedTemplate}
          onChange={setSelectedTemplate}
        />
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
        <LoadingButton 
          onClick={handleUpload}
          disabled={!isClean}
          loading={isUploading}
        >
          Upload
        </LoadingButton>
      </ModalFooter>
    </Modal>
  )
}
export default UploadRecordModal;