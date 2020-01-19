import React from "react";
import moment from "moment";
import CampaignAPI from "api/campaign";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";

function CampaignTableComponent(props){
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Start Date</TableHeader>
          <TableHeader>End Date</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((campaign) => {
          const startDate = new moment(campaign.campaignStartDate).format("DD MMMM YYYY");
          const endDate = new moment(campaign.campaignEndDate).format("DD MMMM YYYY");
          
          let badgeBackground = "Vlt-bg-grey";
          if(campaign.status === "pending" || campaign.status === "paused") badgeBackground = "Vlt-bg-yellow";
          else if(campaign.status.started || campaign.status === "completed") badgeBackground = "Vlt-bg-green";

          return (
            <TableRow key={campaign.id}>
              <TableColumn>{campaign.id}</TableColumn>
              <TableColumn>{campaign.name}</TableColumn>
              <TableColumn>{startDate}</TableColumn>
              <TableColumn>{endDate}</TableColumn>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{campaign.status}</div>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function CampaignTable(props){
  const [ data, setData ] = React.useState([]);

  const listCampaign = async () => {
    const campaigns = await CampaignAPI.listCampaign(process.env.REACT_APP_DUMMY_DATA);
    setData(campaigns);
  }

  React.useEffect(() => {
    listCampaign();
  }, []);

  return <CampaignTableComponent data={data}/>
}

export default CampaignTable;