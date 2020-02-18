import React from "react";

import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

function CampaignDropdown({ 
  label, 
  value, 
  setValue=() => {}, 
  disabled=false,
  refreshToken=null
}){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  React.useEffect(() => {
    mCampaign.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  return (
    <Dropdown 
      label={label} 
      value={value} 
      setValue={setValue} 
      disabled={disabled}
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