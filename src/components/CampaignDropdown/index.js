// @flow
import React from "react";
import Campaign from "entities/campaign";

import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

type Props = {
  label:string,
  value?:Campaign,
  refreshToken?:string,
  onChange?:Function
}

function CampaignDropdown({ label, value, onChange, refreshToken, ...props }:Props){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  function handleChange(campaignId){
    if(onChange){
      const newCampaign = new Campaign({ id: campaignId });
      onChange(newCampaign);
    }
  }

  React.useEffect(() => {
    mCampaign.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  return (
    <Dropdown 
      { ...props }
      label={label} 
      value={value?.id} 
      setValue={handleChange}
    >
      <option>--- Please Select ---</option>
      {mCampaign.data.map((campaign) => {
        return (
          <option value={campaign.id} key={campaign.id}>
            {campaign.name}
          </option>
        )
      })}
    </Dropdown>
  )
}
export default CampaignDropdown;