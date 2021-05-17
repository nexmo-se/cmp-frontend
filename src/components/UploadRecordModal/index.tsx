import { Dispatch, SetStateAction } from "react";

import SuccessMessage from "entities/success";
import Campaign from "entities/campaign";
import Template from "entities/template";

import useRecord from "hooks/record";
import useError from "hooks/error";
import { useSingleTemplate } from "hooks/single-template";
import { useState, useEffect } from "react";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import FileInput from "components/FileInput";
import LoadingButton from "components/LoadingButton";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";

interface UploadRecordModalProps {
  campaign: Campaign;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function UploadRecordModal ({ visible, setVisible, campaign }: UploadRecordModalProps) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaign);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError, throwSuccess } = useError();
  const { retrieve } = useSingleTemplate({ id: selectedTemplate?.id ?? undefined });
  
  function handleCancel () {
    setVisible(false);
  }

  async function handleUpload () {
    try {
      setIsUploading(true);
      if(!selectedCampaign) throw new Error("Please complete the form");
      if(!selectedTemplate) throw new Error("Please complete the form");
      if(!file) throw new Error("Please complete the form");

      const foundTemplate = await mTemplate.retrieve(selectedTemplate);
      await mRecord.createMetadata(selectedCampaign, foundTemplate);
      await mRecord.uploadCSV(selectedCampaign, selectedTemplate, file);
      throwSuccess(new SuccessMessage("File uploaded!"));
      if(onUploaded) onUploaded(selectedCampaign, selectedTemplate);
    } catch (err) {
      throwError(err);
    } finally {
      setVisible(false);
      setIsUploading(false);
      setFile(null);
    }
  }

  useEffect(
    () => {
      setIsClean(
        selectedCampaign !== undefined &&
        selectedTemplate !== undefined &&
        file !== undefined
      );
    },
    [selectedCampaign, selectedTemplate, file]
  )
  
  return (
    <Modal
      visible={visible}
      size="small"
    >
      <ModalHeader setVisible={setVisible}>
        <h4>Upload Records</h4>
      </ModalHeader>
      <ModalContent>
        <CampaignDropdown 
          label="Campaign"
          value={selectedCampaign}
          onChange={setSelectedCampaign}
        />
        <TemplateDropdown 
          label="Template"
          value={selectedTemplate}
          onChange={setSelectedTemplate}
        />
        <FileInput label="CSV Template" setFile={setFile}/>
        {
          file && (
            <>
              <p className="Vlt-truncate">File Name: {file?.name}</p>
              <p>Date: {new moment(file?.lastModifiedDate).format("DD MMMM YYYY HH:mm")}</p>
            </>
          )
        }
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