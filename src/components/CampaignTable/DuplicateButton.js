import React from "react";
import moment from "moment";
import uuid from "uuid/v4";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";
import useCampaign from "hooks/campaign";

import ButtonIcon from "components/ButtonIcon";
import AddCampaignModal from "components/AddCampaignModal";
import LoadingModal from "components/LoadingModal";

function DuplicateButton({ campaign, setRefreshToken }){
  const [ visible, setVisible ] = React.useState(false);
  const [ isDuplicating, setIsDuplicating ] = React.useState(false);
  const [ initCampaign, setInitCampaign ] = React.useState({});
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  function handleAdded(){
    setRefreshToken(uuid());
  }

  async function handleClick(){
    try{
      setIsDuplicating(true);
      const foundCampaign = await mCampaign.retrieve(campaign);
      const fromDate = new moment(foundCampaign.campaignStartDate).format("DD/MM/YYYY");
      const fromTime = new moment(foundCampaign.campaignStartDate).format("hh:mm");
      const toDate = new moment(foundCampaign.campaignEndDate).format("DD/MM/YYYY");
      const toTime = new moment(foundCampaign.campaignEndDate).format("hh:mm");
      const activeStartHour = new moment(foundCampaign.activeStartHour, "hh").format("hh");
      const activeStartMinute = new moment(foundCampaign.activeStartMinute, "mm").format("mm");
      const activeEndHour = new moment(foundCampaign.activeEndHour, "hh").format("hh");
      const activeEndMinute = new moment(foundCampaign.activeEndMinute, "mm").format("mm");

      setInitCampaign({
        name: foundCampaign.name,
        activeStartTime: `${activeStartHour}:${activeStartMinute}`,
        activeEndTime: `${activeEndHour}:${activeEndMinute}`,
        activeOnWeekends: foundCampaign.activeOnWeekends,
        timezone: foundCampaign.timezone,
        fromDate,
        fromTime,
        toDate,
        toTime  
      })
      setIsDuplicating(false);
      setVisible(true);
    }catch(err){
      throwError(err);
    }
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-copy" 
        onClick={handleClick}
        style={{ marginRight: 4 }}
      />
      <AddCampaignModal 
        visible={visible} 
        setVisible={setVisible} 
        initState={initCampaign} 
        onAdded={handleAdded}
      />
      <LoadingModal 
        visible={isDuplicating}
        label="Duplicating campaign"
      />
    </React.Fragment>
  )
}
export default DuplicateButton;