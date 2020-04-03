import React from "react";

import useUser from "hooks/user";
import useError from "hooks/error";
import useCampaign from "hooks/campaign";
import SuccessMessage from "entities/success";

import Button from "components/Button";
import LoadingModal from "components/LoadingModal";

function ExportCampaignDetailReportButton({ campaign }){
  const [ exporting, setExporting ] = React.useState(false);
  const mError = useError();
  const mUser = useUser();
  const mCampaign = useCampaign(mUser.token);

  async function handleClick(){
    try{
      setExporting(true);
      await mCampaign.exportDetailReport(campaign);
      mError.throwSuccess(new SuccessMessage("Export is on going, check status on reports menu"));
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