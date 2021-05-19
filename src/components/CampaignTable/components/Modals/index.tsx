import Campaign from "entities/campaign";
import { createContext } from "react";
import { useState, useContext } from "react";

import AddCampaignModal from "components/AddCampaignModal";
import LoadingModal from "components/LoadingModal";
import GenerateCSVModal from "components/GenerateCSVModal";
import UploadRecordModal from "components/UploadRecordModal";

interface ShowLoadingOptions {
  label: string;
}

interface ShowAddModalOptions {
  campaign: Campaign;
}

interface ShowUploadModalOptions extends ShowAddModalOptions {};
interface ShowGenerateModalOptions extends ShowAddModalOptions {};

interface ModalsContextProps {
  showLoading: (args: ShowLoadingOptions) => void;
  showAddModal: (args: ShowAddModalOptions) => void;
  showUploadModal: (args: ShowUploadModalOptions) => void;
  showGenerateModal: (args: ShowGenerateModalOptions) => void;
  hideLoading: () => void;
}

interface ModalsProps {
  children: any;
}

const ModalsContext = createContext<ModalsContextProps>({} as ModalsContextProps);

function Modals ({ children }: ModalsProps) {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [addModalCampaign, setAddModalCampaign] = useState<Campaign>();
  const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [uploadModalCampaign, setUploadModalCampaign] = useState<Campaign>();
  const [generateModalVisible, setGenerateModalVisible] = useState<boolean>(false);
  const [generateModalCampaign, setGenerateModalCampaign] = useState<Campaign>();
  const [loadingModalVisible, setLoadingModalVisible] = useState<boolean>(false);
  const [loadingModalLabel, setLoadingModalLabel] = useState<string>("");

  function showAddModal ({ campaign }: ShowAddModalOptions) {
    setAddModalCampaign(campaign);
    setAddModalVisible(true);
  }

  function showUploadModal ({ campaign }: ShowUploadModalOptions) {
    setUploadModalCampaign(campaign);
    setUploadModalVisible(true);
  }

  function showGenerateModal ({ campaign }: ShowGenerateModalOptions) {
    setGenerateModalCampaign(campaign);
    setGenerateModalVisible(true);
  }

  function showLoading ({ label }: ShowLoadingOptions) {
    setLoadingModalLabel(label);
    setLoadingModalVisible(true);
  }

  function hideLoading () {
    setLoadingModalVisible(false);
  }

  return (
    <ModalsContext.Provider
      value={{
        showLoading,
        showAddModal,
        showUploadModal,
        showGenerateModal,
        hideLoading
      }}
    >
      <AddCampaignModal 
        visible={addModalVisible} 
        setVisible={setAddModalVisible} 
        campaign={addModalCampaign} 
      /> 

      <LoadingModal 
        visible={loadingModalVisible}
        label={loadingModalLabel}
      />

      {
        generateModalCampaign && (
          <GenerateCSVModal 
            visible={generateModalVisible} 
            setVisible={setGenerateModalVisible} 
            campaign={generateModalCampaign}
          />
        )
      }

      {
        uploadModalCampaign && (
          <UploadRecordModal 
            campaign={uploadModalCampaign}
            visible={uploadModalVisible} 
            setVisible={setUploadModalVisible} 
          />
        )
      }
      {children}
    </ModalsContext.Provider>
  );
}

export function useModals() {
 return useContext(ModalsContext); 
}

export default Modals;