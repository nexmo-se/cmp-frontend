import styles from "./QuickWizardPage.module.css";
import Campaign from "entities/campaign"
import clsx from "clsx";
import { useState } from "react";

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
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>();
  
  return (
    <div className={clsx("Vlt-grid", styles.container)}>
      <div className={clsx("Vlt-card", styles.medium_width)}>
        <div className="Vlt-card__header">
          <h2>Quick Wizard</h2>
        </div>
        <div className="Vlt-card__content">
          <StepProvider>
            <CreateAPIKeyStep />
            <ChannelSelectionStep />
            <CreateApplicationStep acceptedFunnels={["social-channel", "voice"]} />
            <CreateChannelStep acceptedFunnels={["sms", "social-channel", "voice", "number-insight"]} />
            <CreateTemplateStep acceptedFunnels={["sms", "social-channel", "voice"]} />
            <CreateCampaignStep />
          </StepProvider>
          
          <div className="Vlt-text-separator">
            <span>Running your campaign</span>
          </div>
          <CampaignDropdown 
            label="Select your campaign"
            value={selectedCampaign}
            onChange={setSelectedCampaign}
          />
          <div className="Vlt-grid Vlr-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DownloadButton
                campaign={selectedCampaign}
                disabled={selectedCampaign === undefined}
              />
            </div>
            <div className="Vlt-col Vlt-col--A">
              <UploadButton
                campaign={selectedCampaign}
                disabled={selectedCampaign === undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickWizardPage;