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
  const [ channelRefreshToken, setChannelRefreshToken ] = React.useState(null);
  const [ templateRefreshToken, setTemplateRefreshToken ] = React.useState(null);
  const [ applicationRefreshToken, setApplicationRefreshToken ] = React.useState(null);
  const [ selectedChannel, setSelectedChannel ] = React.useState("sms");
  const mStyles = useStyles();

  function handleCampaignCreated(){
    setCampaignRefreshToken(uuid());
  }

  function handleAPIKeyCreated(){
    setChannelRefreshToken(uuid());
    setApplicationRefreshToken(uuid());
  }

  function handleChannelCreated(){
    setTemplateRefreshToken(uuid());
  }

  function handleTemplateCreated(){
    setCampaignRefreshToken(uuid());
  }

  function handleApplicationCreated(){
    setChannelRefreshToken(uuid());
  }

  return (
    <div className={clsx("Vlt-grid", mStyles.container)}>
      <div className={clsx("Vlt-card", mStyles.mediumWidth)}>
        <div className="Vlt-card__header">
          <h2>Quick Wizard</h2>
        </div>
        <div className="Vlt-card__content">
          <CreateAPIKeyStep number={1} onCreated={handleAPIKeyCreated} />
          <ChannelSelectionStep 
            number={2} 
            value={selectedChannel}
            setValue={setSelectedChannel}
          />
          {selectedChannel === "social-channel"?(
            <React.Fragment>
              <CreateApplicationStep 
                number={3} 
                onCreated={handleApplicationCreated}
                refreshToken={applicationRefreshToken} 
              />
              <CreateChannelStep 
                number={4} 
                refreshToken={channelRefreshToken} 
                onCreated={handleChannelCreated}
                disableSMS
              />
              <CreateTemplateStep 
                number={5} 
                refreshToken={templateRefreshToken}
                onCreated={handleTemplateCreated}
              />
              <CreateCampaignStep number={6} onAdded={handleCampaignCreated} />
            </React.Fragment>
          ): (
            <React.Fragment>
              <CreateChannelStep 
                number={3} 
                refreshToken={channelRefreshToken} 
                onCreated={handleChannelCreated}
              />
              <CreateTemplateStep 
                number={4} 
                refreshToken={templateRefreshToken} 
                onCreated={handleTemplateCreated}
              />
              <CreateCampaignStep number={5} onCreated={handleCampaignCreated} />
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
              <DownloadButton campaign={campaign} refreshToken={campaignRefreshToken} />
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