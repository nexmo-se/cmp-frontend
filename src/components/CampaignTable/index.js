import React from "react";
import moment from "moment";

import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/CampaignTable/DetailColumn";
import Empty from "components/Empty";

function CampaignTable({ refreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);
  
  React.useEffect(() => {
    mCampaign.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  if(mCampaign.data.length <= 0) return <Empty/>
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>START DATE</TableHeader>
          <TableHeader>END DATE</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {mCampaign.data.map((campaign) => {
          const startDate = new moment(campaign.campaignStartDate).format("DD MMMM YYYY");
          const endDate = new moment(campaign.campaignEndDate).format("DD MMMM YYYY");
          
          let badgeBackground = "Vlt-bg-grey";
          if(campaign.status === "pending" || campaign.status === "paused") badgeBackground = "Vlt-bg-yellow";
          else if(campaign.status.started || campaign.status === "completed") badgeBackground = "Vlt-bg-green";

          return (
            <TableRow key={campaign.id}>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{campaign.status}</div>
              </TableColumn>
              <TableColumn>{campaign.name}</TableColumn>
              <TableColumn>{startDate}</TableColumn>
              <TableColumn>{endDate}</TableColumn>
              <DetailColumn campaign={campaign} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default CampaignTable;