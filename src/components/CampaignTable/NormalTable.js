import React from "react";
import moment from "moment";

import NumberIndicator from "components/NumberIndicator";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

import DetailColumn from "./DetailColumn";

function NormalTable({ campaigns, setRefreshToken, limit=10 }){
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader />
          <TableHeader>NAME</TableHeader>
          <TableHeader>START DATE</TableHeader>
          <TableHeader>END DATE</TableHeader>
          <TableHeader>END DATE</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {campaigns.slice(0, limit + 1).map((campaign, index) => {
          let badgeBackground = "Vlt-grey";
          if(campaign.status === "pending" || campaign.status === "paused") badgeBackground = "Vlt-yellow";
          else if(campaign.status.started || campaign.status === "completed") badgeBackground = "Vlt-green";
          
          const startDate = new moment(campaign.campaignStartDate).local().format("DD MMMM YYYY");
          const endDate = new moment(campaign.campaignEndDate).local().format("DD MMMM YYYY");

          return(
            <TableBodyRow key={campaign.id}>
              <TableColumn>
                <NumberIndicator number={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>
                    {campaign.name} &nbsp;|&nbsp;
                    <span className={badgeBackground}>{campaign.status}</span>
                  </b>
                </p>
                <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 300 }}>{campaign.id}</p>
              </TableColumn>
              <TableColumn>{startDate}</TableColumn>
              <TableColumn>{endDate}</TableColumn>
              <DetailColumn campaign={campaign} setRefreshToken={setRefreshToken} />
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;