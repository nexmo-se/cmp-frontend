import Config from "config";
import Campaign from "entities/campaign";

import useUser from "hooks/user";
import useSWR from "swr";
import { useEffect, useState } from "react";
import FetchAPI from "api/fetch";

interface UseSingleCampaignOptions {
  id?: string;
}

interface UpdateStatusOptions {
  status: string;
}

export function useSingleCampaign ({ id }: UseSingleCampaignOptions) {
  const [campaign, setCampaign] = useState<Campaign>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR(
    () => {
      if (!id) return null;
      return [`${Config.apiDomain}/campaigns/${id}`, token];
    }
  );

  async function updateStatus ({ status }: UpdateStatusOptions) {
    if (!token) return;
    
    const url = `${Config.apiDomain}/campaigns/${id}/status`;
    await FetchAPI.put(url, token, JSON.stringify({ status }));
    await mutate();
  }

  async function remove () {
    if (!token) return;

    const url = `${Config.apiDomain}/campaigns/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;
      
      const campaign = Campaign.fromResponse(data);
      setCampaign(campaign);
    },
    [data]
  );

  return {
    campaign,
    remove,
    updateStatus,
    mutate,
    isLoading: !campaign && !error
  }
}