import React from "react";

import TableColumn from "components/Table/TableColumn";
import ButtonIcon from "components/ButtonIcon";
import DownloadButton from "components/CampaignTable/DownloadButton";
import StartButton from "components/CampaignTable/StartButton";
import RestartButton from "components/CampaignTable/RestartButton";
import PauseButton from "components/CampaignTable/PauseButton";

function DetailColumn({ campaign, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <ButtonIcon icon="Vlt-icon-gear"/>
      <DownloadButton campaign={campaign}/>
      {campaign.status === "completed"?(
        <RestartButton setRefreshToken={setRefreshToken} />
      ): campaign.status === "draft"?(
        <StartButton setRefreshToken={setRefreshToken} />
      ): campaign.status === "pending"?(
        <PauseButton campaign={campaign} setRefreshToken={setRefreshToken} />
      ): null}
      <ButtonIcon type="destructive" icon="Vlt-icon-bin" />
    </TableColumn>
  )
}
export default DetailColumn