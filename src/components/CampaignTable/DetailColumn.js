import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/CampaignTable/DetailButton";
import DownloadButton from "components/CampaignTable/DownloadButton";
import StartButton from "components/CampaignTable/StartButton";
import RestartButton from "components/CampaignTable/RestartButton";
import PauseButton from "components/CampaignTable/PauseButton";
import UploadButton from "components/CampaignTable/UploadButton";
import DuplicateButton from "components/CampaignTable/DuplicateButton";
import DeleteButton from "components/CampaignTable/DeleteButton";

function DetailColumn({ campaign, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton campaign={campaign} />
      <DuplicateButton campaign={campaign} setRefreshToken={setRefreshToken}/>
      <DownloadButton campaign={campaign}/>
      <UploadButton />
      {campaign.status === "completed"?(
        <RestartButton campaign={campaign} setRefreshToken={setRefreshToken} />
      ): campaign.status === "draft" || campaign.status === "paused"?(
        <StartButton campaign={campaign} setRefreshToken={setRefreshToken}  />
      ): campaign.status === "started"?(
        <PauseButton campaign={campaign} setRefreshToken={setRefreshToken} />
      ): null}
      <DeleteButton campaign={campaign} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn