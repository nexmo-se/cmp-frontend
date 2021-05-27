import FetchAPI from "api/fetch";
import Config from "config";
import SummaryReport from "entities/summary-report";

import useUser from "hooks/user";
import { useCallback } from "react";

interface UseSummaryReportProps {
  campaignId?: string;
}

export function useSummaryReport ({ campaignId }: UseSummaryReportProps) {
  const { token } = useUser();

  const retrieve = useCallback(
    async () => {
      if (!campaignId) return undefined;
      if (!token) return;
      
      const url = `${Config.apiDomain}/reports/json`;
      const body = JSON.stringify({
        type: "campaign_summary",
        content: { cmpCampaignId: campaignId }
      });

      const response = await FetchAPI.post({ url, token, body });
      if (response) return SummaryReport.fromResponse(response);
      else return undefined;
    },
    [campaignId, token]
  );

  const download = useCallback(
    async () => {
      if (!token) return;
      
      const url = `${Config.apiDomain}/reports/archive/${campaignId}.csv`;
      return FetchAPI.get(url, token, "blob");
    },
    [campaignId, token]
  )

  return {
    retrieve,
    download
  }
}
