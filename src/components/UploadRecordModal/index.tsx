import { Dispatch, SetStateAction } from "react";

import SuccessMessage from "entities/success";
import Campaign from "entities/campaign";
import Template from "entities/template";

import useRecord from "hooks/record";
import useError from "hooks/error";
import { useSingleTemplate } from "hooks/single-template";
import { useSingleCampaign } from "hooks/single-campaign";
import { useState, useEffect } from "react";

import Modal from "components/Modal";
import Button from "components/Button";
import FileInput from "components/FileInput";
import LoadingButton from "components/LoadingButton";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";
import { DateTime } from "luxon";

interface UploadRecordModalProps {
  campaign: Campaign;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onUploaded?: (campaign: Campaign, template: Template) => void;
}

function UploadRecordModal ({ visible, setVisible, campaign, onUploaded }: UploadRecordModalProps) {
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaign);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError, throwSuccess } = useError();
  const { template: foundTemplate } = useSingleTemplate({ id: selectedTemplate?.id ?? undefined });
  const { campaign: foundCampaign } = useSingleCampaign({ id: selectedCampaign?.id ?? undefined });
  const { createMetadata, uploadCSV } = useRecord();
  
  function handleCancel () {
    setVisible(false);
  }

  async function handleUpload () {
    try {
      setIsUploading(true);
      if (!foundTemplate) return;
      if (!foundCampaign) return;
      if (!file) throw new Error("Please complete the form");

      await createMetadata(foundCampaign, foundTemplate);
      await uploadCSV(foundCampaign, foundTemplate, file);
      throwSuccess(new SuccessMessage("File uploaded!"));
      if (onUploaded) onUploaded(foundCampaign, foundTemplate);
    } catch (err: unknown) {
      throwError(err as Error);
    } finally {
      setVisible(false);
      setIsUploading(false);
      setFile(undefined);
    }
  }

  useEffect(
    () => {
      setIsClean(
        foundCampaign !== undefined &&
        foundTemplate !== undefined &&
        file !== undefined
      );
    },
    [foundTemplate, foundCampaign, file]
  )
  
  return (
    <Modal
      visible={visible}
      size="small"
    >
      <Modal.Header setVisible={setVisible}>
        <h4>Upload Records</h4>
      </Modal.Header>
      <Modal.Content>
        <CampaignDropdown 
          label="Campaign"
          value={selectedCampaign}
          onChange={setSelectedCampaign}
          disabled
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
              <p className="Vlt-truncate">File Name: {file.name}</p>
              <p>Date: {DateTime.fromMillis(file.lastModified).toLocaleString(DateTime.DATETIME_FULL)}</p>
            </>
          )
        }
      </Modal.Content>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  )
}
export default UploadRecordModal;