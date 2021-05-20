import Campaign from "entities/campaign";
import lodash from "lodash";
import useCampaign from "hooks/campaign";
import { Dispatch, SetStateAction } from "react";

import Dropdown from "components/Dropdown";

type OnChange = Dispatch<SetStateAction<Campaign | undefined>> | Dispatch<SetStateAction<Campaign>>;

interface CampaignDropdownProps {
  label: string;
  value?: Campaign;
  onChange?: OnChange;
  disabled?: boolean;
  status?: string;
}

function CampaignDropdown ({ status = "all", label, value, onChange, ...props }: CampaignDropdownProps) {
  const { campaigns } = useCampaign();

  function handleChange (campaignId: string) {
    if (!campaigns) return;
    const foundCampaign = lodash(campaigns).find({ id: campaignId });
    if (!foundCampaign) return;
    if (onChange) onChange(foundCampaign);
  }

  function filterCampaign (campaigns: Campaign[]) {
    if (!campaigns) return [];
    if (status === "all" ) return campaigns;

    const filteredCampaigns = lodash(campaigns).filter({ status }).value();
    if (filteredCampaigns) return filteredCampaigns;
    else return [];
  }

  return (
    <Dropdown
      {...props}
      label={label} 
      value={value?.id ?? ""} 
      setValue={handleChange}
    >
      <option>--- Please Select ---</option>
      {
        filterCampaign(campaigns ?? []).map(
          (campaign) => {
            return (
              <option
                value={campaign.id}
                key={campaign.id}
              >
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