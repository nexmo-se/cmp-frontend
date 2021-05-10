import styles from "./QuickWizardPage.module.css";

import React from "react";
import Campaign from "entities/campaign"
import clsx from "clsx";
import { v4 as uuid } from "uuid";

import { useState } from "react";
import { useStep } from "./components/StepProvider";

import CampaignDropdown from "components/CampaignDropdown";
import DownloadButton from "./components/DownloadButton";
import UploadButton from "./components/UploadButton";
import CreateAPIKeyStep from "./components/CreateApiKeyStep";
import CreateApplicationStep from "./components/CreateApplicationStep";
import CreateChannelStep from "./components/CreateChannelStep";
import CreateTemplateStep from "./components/CreateTemplateStep";
import CreateCampaignStep from "./components/CreateCampaignStep";
import ChannelSelectionStep from "./components/ChannelSelectionStep";
import StepProvider from "./components/StepProvider";

function QuickWizardPage () {
  const [campaignRefreshToken, setCampaignRefreshToken] = useState<string>(uuid());
  const [channelRefreshToken, setChannelRefreshToken] = useState<string>(uuid());
  const [templateRefreshToken, setTemplateRefreshToken] = useState<string>(uuid());
  const [applicationRefreshToken, setApplicationRefreshToken] = useState<string>(uuid());
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | undefined>();
  const { funnel, setFunnel } = useStep();

  function handleCampaignCreated (createdCampaign) {
    setCampaignRefreshToken(uuid());
    setSelectedCampaign(createdCampaign);
  }

  function handleAPIKeyCreated () {
    setChannelRefreshToken(uuid());
    setApplicationRefreshToken(uuid());
  }

  function handleChannelCreated () {
    setTemplateRefreshToken(uuid());
  }

  function handleTemplateCreated () {
    setCampaignRefreshToken(uuid());
  }

  function handleApplicationCreated () {
    setChannelRefreshToken(uuid());
  }
  
  return (
    <div className={clsx("Vlt-grid", styles.container)}>
      <div className={clsx("Vlt-card", styles.medium_width)}>
        <div className="Vlt-card__header">
          <h2>Quick Wizard</h2>
        </div>
        <div className="Vlt-card__content">
          <StepProvider>
            <CreateAPIKeyStep onCreated={handleAPIKeyCreated} />
            <ChannelSelectionStep />
            <CreateApplicationStep
              acceptedFunnels={["social-channel", "voice"]}
              onCreated={handleApplicationCreated}
              refreshToken={applicationRefreshToken}
            />
            <CreateChannelStep
              acceptedFunnels={["sms", "social-channel", "voice", "number-insight"]}
              refreshToken={channelRefreshToken}
              onCreated={handleChannelCreated}
            />
            <CreateTemplateStep 
              acceptedFunnels={["sms", "social-channel", "voice"]}
              refreshToken={templateRefreshToken}
              onCreated={handleTemplateCreated}
            />
            <CreateCampaignStep
              onAdded={handleCampaignCreated} 
            />
          </StepProvider>
          
          <div className="Vlt-text-separator">
            <span>Running your campaign</span>
          </div>
          <CampaignDropdown 
            label="Select your campaign"
            value={selectedCampaign}
            onChange={setSelectedCampaign}
            refreshToken={campaignRefreshToken}
          />
          <div className="Vlt-grid Vlr-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DownloadButton 
                campaign={selectedCampaign} 
                refreshToken={campaignRefreshToken} 
                disabled={!selectedCampaign}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <UploadButton 
                campaign={selectedCampaign}
                refreshToken={campaignRefreshToken}
                disabled={!selectedCampaign}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickWizardPage;