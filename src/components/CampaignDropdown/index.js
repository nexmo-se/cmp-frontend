// @flow
import React from "react";
import Campaign from "entities/campaign";

import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

interface CampaignDropdownProps {
  label: string;
  value: ?Campaign;
  refreshToken?: string;
  onChange: (campaign: Campaign) => void;
}

function CampaignDropdown ({ label, value, onChange, refreshToken, ...props }:CampaignDropdownProps) {
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const { list, data } = useCampaign(token);

  function handleChange(campaignId){
    if(onChange){
      const newCampaign = new Campaign({ id: campaignId });
      onChange(newCampaign);
    }
  }

  React.useEffect(
    () => {
      list().catch((err) => throwError(err));
    },
    [refreshToken, list, throwError]
  )

  return (
    <Dropdown 
      { ...props }
      label={label} 
      value={value?.id} 
      setValue={handleChange}
    >
      <option>--- Please Select ---</option>
      {
        data.map(
          (campaign) => {
            return (
              <option value={campaign.id} key={campaign.id}>
                {campaign.name}
              </option>
            )
          }
        )
      }
    </Dropdown>
  )
}
export default CampaignDropdown;