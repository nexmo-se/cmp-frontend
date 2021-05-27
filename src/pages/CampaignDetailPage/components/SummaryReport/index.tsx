import { createContext } from "react";

import Campaign from "entities/campaign";
import SummaryReport from "entities/summary-report";

import { useSingleCampaign } from "hooks/single-campaign";
import { useSummaryReport } from "hooks/summary-report";
import { useState, useEffect, useContext } from "react";

import FullPageSpinner from "components/FullPageSpinner";

interface SummaryReportContextProps {
  campaign?: Campaign;
  report?: SummaryReport;
}

interface SummaryReportProviderProps {
  children?: any;
  campaignId: string;
}

const SummaryReportContext = createContext<SummaryReportContextProps>({} as SummaryReportContextProps);

function SummaryReportProvider ({ children, campaignId }: SummaryReportProviderProps) {
  const [report, setReport] = useState<SummaryReport>();
  const { campaign } = useSingleCampaign({ id: campaignId });
  const { retrieve } = useSummaryReport({ campaignId });

  useEffect(
    () => {
      async function fetchData () {
        const report = await retrieve();
        setReport(report);
      }
      fetchData();
    },
    [retrieve]
  )

  return (
    <SummaryReportContext.Provider
      value={{
        campaign,
        report,
      }}
    >
      {
        (!campaign && !report)? (<FullPageSpinner />): children
      }
    </SummaryReportContext.Provider>
  )
}

export function useReportData () {
  return useContext(SummaryReportContext);
}

export default SummaryReportProvider;