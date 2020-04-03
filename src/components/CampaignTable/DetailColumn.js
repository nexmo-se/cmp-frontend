import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/CampaignTable/DetailButton";
import DownloadButton from "components/CampaignTable/DownloadButton";
import StartButton from "components/CampaignTable/StartButton";
import PauseButton from "components/CampaignTable/PauseButton";
import UploadButton from "components/CampaignTable/UploadButton";
import DuplicateButton from "components/CampaignTable/DuplicateButton";
import DeleteButton from "components/CampaignTable/DeleteButton";

function DetailColumn({ campaign, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton campaign={campaign} disabled={campaign.status !== "completed"} />
      <DuplicateButton campaign={campaign} setRefreshToken={setRefreshToken} />
      <DownloadButton campaign={campaign} disabled={campaign.status !== "draft"} />
      <UploadButton disabled={campaign.status !== "draft"} />
      {campaign.status === "draft"?(
        <StartButton campaign={campaign} setRefreshToken={setRefreshToken}  />
      ): campaign.status === "paused"?(
        <StartButton campaign={campaign} setRefreshToken={setRefreshToken}  />
      ): campaign.status === "started" || campaign.status === "pending"?(
        <PauseButton campaign={campaign} setRefreshToken={setRefreshToken} />
      ): campaign.status === "completed"?(
        <StartButton disabled />
      ): null}
      <DeleteButton campaign={campaign} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn