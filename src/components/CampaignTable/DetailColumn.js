// @flow
import React from "react";
import Campaign from "entities/campaign";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "./DetailButton";
import DownloadButton from "./DownloadButton";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import UploadButton from "./UploadButton";
import DuplicateButton from "./DuplicateButton";
import DeleteButton from "./DeleteButton";

type Props = {
  campaign:Campaign,
  setRefreshToken:Function
}

function DetailColumn({ campaign, setRefreshToken }:Props){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton campaign={campaign} disabled={campaign.status !== "completed" && campaign.status !== "reporting"} />
      <DuplicateButton campaign={campaign} setRefreshToken={setRefreshToken} />
      <DownloadButton campaign={campaign} disabled={campaign.status !== "draft"} />
      <UploadButton campaign={campaign} disabled={campaign.status !== "draft"} />
      {campaign.status === "draft"?(
        <StartButton campaign={campaign} setRefreshToken={setRefreshToken}  />
      ): campaign.status === "paused"?(
        <StartButton campaign={campaign} setRefreshToken={setRefreshToken}  />
      ): campaign.status === "started" || campaign.status === "pending"?(
        <PauseButton campaign={campaign} setRefreshToken={setRefreshToken} />
      ): campaign.status === "completed" || campaign.status === "reporting"?(
        <StartButton disabled />
      ): null}
      <DeleteButton campaign={campaign} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn