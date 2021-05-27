import SuccessMessage from "entities/success";
import CustomError from "entities/error";

import useError from "hooks/error";
import { useSummaryReport } from "hooks/summary-report";
import { useReportData } from "../SummaryReport";
import { useState } from "react";

import Button from "components/Button";
import LoadingModal from "components/LoadingModal";

function ExportCampaignDetailReportButton () {
  const [exporting, setExporting] = useState<boolean>(false);
  const { throwError, throwSuccess } = useError();
  const { campaign } = useReportData();
  const { download } = useSummaryReport({ campaignId: campaign?.id ?? undefined })

  async function handleClick () {
    try {
      if (!campaign) return;
      if (campaign.status !== "completed") {
        throw new CustomError(
          "component/export_campaign_detail_report_button", 
          "Campaign report still generating. Please wait until it's completed"
        );
      }

      setExporting(true);
      const downloadFile = await download();
      const downloadURL = URL.createObjectURL(downloadFile);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.setAttribute("download", `${campaign.id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      throwSuccess(new SuccessMessage("Your download is starting"));
    } catch (err) {
      throwError(err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <Button 
        onClick={handleClick}
        type="secondary"
      >
        Export Detail Report
      </Button>
      <LoadingModal
        visible={exporting}
        label="Exporting..."
      />
    </>
  )
}

export default ExportCampaignDetailReportButton;
