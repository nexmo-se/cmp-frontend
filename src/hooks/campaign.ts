import FetchAPI from "api/fetch";
import Campaign from "entities/campaign";
import Config from "config";
import lodash from "lodash";
import { DateTime } from "luxon";

import useSWR from "swr";
import useUser from "./user";
import { useState, useEffect } from "react";

interface CreateOptions {
  name: string;
  campaignStartDate: DateTime;
  campaignEndDate: DateTime;
  activeStartHour: number;
  activeEndHour: number;
  activeStartMinute: number;
  activeEndMinute: number;
  activeOnWeekends: boolean;
  cnam: boolean;
  timezone: string;
}

function useCampaign () {
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/campaigns`, token]);

  async function create (options: CreateOptions) {
    const url = `${Config.apiDomain}/campaigns`;
    const body = JSON.stringify({
      name: options.name,
      campaignStartDate: options.campaignStartDate.toISO(),
      campaignEndDate: options.campaignEndDate.toISO(),
      activeStartHour: options.activeStartHour,
      activeStartMinute: options.activeStartMinute,
      activeEndHour: options.activeEndHour,
      activeEndMinute: options.activeEndMinute,
      activeOnWeekends: options.activeOnWeekends,
      niCnam: options.cnam,
      timezone: options.timezone
    });

    await FetchAPI.post({ url, token, body });
    await mutate();
  }
  
  useEffect(
    () => {
      if (!data) return;

      const campaigns = lodash.map(data, Campaign.fromResponse);
      setCampaigns(campaigns);
    },
    [data]
  )

  return {
    campaigns,
    create,
    mutate,
    isLoading: !campaigns && !error
  }
}

export default useCampaign;
