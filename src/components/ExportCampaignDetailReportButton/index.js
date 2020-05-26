import React from "react";

import useUser from "hooks/user";
import useError from "hooks/error";
import useReport from "hooks/report";

import CustomError from "entities/error";
import SuccessMessage from "entities/success";

import Button from "components/Button";
import LoadingModal from "components/LoadingModal";

function ExportCampaignDetailReportButton({ campaign }){
  const [ exporting, setExporting ] = React.useState(false);
  const mError = useError();
  const mUser = useUser();
  const mReport = useReport(mUser.token);

  async function handleClick(){
    try{
      if(campaign.status !== "completed"){
        throw new CustomError(
          "component/export_campaign_detail_report_button", 
          "Campaign report still generating. Please wait until it's completed"
        );
      }

      setExporting(true);
      const downloadFile = await mReport.download(campaign);
      const downloadURL = URL.createObjectURL(downloadFile);
      const link = document.createElement("a");
      link.href = downloadURL;
      link.setAttribute("download", `${campaign.id}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      mError.throwSuccess(new SuccessMessage("Your download is starting"));
    }catch(err){
      mError.throwError(err);
    }finally{
      setExporting(false);
    }
  }

  return (
    <React.Fragment>
      <Button 
        onClick={handleClick}
        type="secondary"
      >
        Export Detail Report
      </Button>
      <LoadingModal visible={exporting} label="Exporting..." />
    </React.Fragment>
  )
}
export default ExportCampaignDetailReportButton;