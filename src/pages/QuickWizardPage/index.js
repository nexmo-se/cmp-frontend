// @flow
import React from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/styles";

import Campaign from "entities/campaign"

import CampaignDropdown from "components/CampaignDropdown";
import DownloadButton from "./DownloadButton";
import UploadButton from "./UploadButton";
import CreateAPIKeyStep from "./CreateAPIKeyStep";
import CreateApplicationStep from "./CreateApplicationStep";
import CreateChannelStep from "./CreateChannelStep";
import CreateTemplateStep from "./CreateTemplateStep";
import CreateCampaignStep from "./CreateCampaignStep";
import ChannelSelectionStep from "./ChannelSelectionStep";

const useStyles = makeStyles(() => ({
  container: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  mediumWidth: { width: "60%" }
}))

function QuickWizardPage(){
  const [ campaignRefreshToken, setCampaignRefreshToken ] = React.useState<string>(uuid());
  const [ channelRefreshToken, setChannelRefreshToken ] = React.useState<string>(uuid());
  const [ templateRefreshToken, setTemplateRefreshToken ] = React.useState<string>(uuid());
  const [ applicationRefreshToken, setApplicationRefreshToken ] = React.useState<string>(uuid());
  const [ selectedChannel, setSelectedChannel ] = React.useState("sms");
  const [ selectedCampaign, setSelectedCampaign ] = React.useState<Campaign|void>();
  const mStyles = useStyles();

  function handleCampaignCreated(createdCampaign){
    setCampaignRefreshToken(uuid());
    setSelectedCampaign(createdCampaign);
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
              <UploadButton disabled={!selectedCampaign}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickWizardPage;