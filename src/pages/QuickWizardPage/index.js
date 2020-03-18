import React from "react";
import uuid from "uuid/v4";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import CampaignDropdown from "components/CampaignDropdown";

import DownloadButton from "pages/QuickWizardPage/DownloadButton";
import UploadButton from "pages/QuickWizardPage/UploadButton";
import CreateAPIKeyStep from "pages/QuickWizardPage/CreateAPIKeyStep";
import CreateApplicationStep from "pages/QuickWizardPage/CreateApplicationStep";
import CreateChannelStep from "pages/QuickWizardPage/CreateChannelStep";
import CreateTemplateStep from "pages/QuickWizardPage/CreateTemplateStep";
import CreateCampaignStep from "pages/QuickWizardPage/CreateCampaignStep";
import ChannelSelectionStep from "pages/QuickWizardPage/ChannelSelectionStep";

const useStyles = makeStyles(() => ({
  container: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  mediumWidth: { width: "60%" }
}))

function QuickWizardPage(){
  const [ campaign, setCampaign ] = React.useState(null);
  const [ campaignRefreshToken, setCampaignRefreshToken ] = React.useState(null);
  const [ selectedChannel, setSelectedChannel ] = React.useState("sms");
  const mStyles = useStyles();

  function handleCampaignAdded(){
    setCampaignRefreshToken(uuid());
  }

  return (
    <div className={clsx("Vlt-grid", mStyles.container)}>
      <div className={clsx("Vlt-card", mStyles.mediumWidth)}>
        <div className="Vlt-card__header">
          <h2>Quick Wizard</h2>
        </div>
        <div className="Vlt-card__content">
          <CreateAPIKeyStep number={1} />
          <ChannelSelectionStep 
            number={2} 
            value={selectedChannel}
            setValue={setSelectedChannel}
          />
          {selectedChannel === "social-channel"?(
            <React.Fragment>
              <CreateApplicationStep number={3} />
              <CreateChannelStep number={4} disableSMS/>
              <CreateTemplateStep number={5} />
              <CreateCampaignStep number={6} onAdded={handleCampaignAdded}/>
            </React.Fragment>
          ): (
            <React.Fragment>
              <CreateChannelStep number={3} />
              <CreateTemplateStep number={4} />
              <CreateCampaignStep number={5} onAdded={handleCampaignAdded}/>
            </React.Fragment>
          )}
          
          <div className="Vlt-text-separator">
            <span>Running your campaign</span>
          </div>
          <CampaignDropdown 
            label="Select your campaign"
            value={campaign}
            setValue={setCampaign}
            refreshToken={campaignRefreshToken}
          />
          <div className="Vlt-grid Vlr-grid--narrow">
            <div className="Vlt-col Vlt-col--A">
              <DownloadButton campaign={campaign}/>
            </div>
            <div className="Vlt-col Vlt-col--A">
              <UploadButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickWizardPage;