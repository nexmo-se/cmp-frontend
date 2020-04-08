import React from "react";
import moment from "moment";

import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Button from "components/Button";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

import DetailColumn from "./DetailColumn";
import Filter from "./Filter";

function NormalTable({ campaigns, setRefreshToken, limit=10 }){
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const [ selectedFilter, setSelectedFilter ] = React.useState("draft");

  React.useEffect(() => {
    setCurrentPage(1);
  }, [ selectedFilter ])

  return (
    <React.Fragment>
      <Filter onChange={setSelectedFilter} />
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
          {campaigns
            .filter((campaign) => {
              const filter = selectedFilter.split("|");
              if(selectedFilter === "all") return true;
              else if(filter.includes(campaign.status)) return true;
              else return false;
            })
            .slice((currentPage - 1) * limit, limit * currentPage)
            .map(
              (campaign, index) => {
                const yellowBadge = [ "pending", "paused", "reporting" ];
                const greenBadge = [ "started", "completed" ];
                const badgeBackground = (yellowBadge.includes(campaign.status))? "Vlt-yellow": 
                                        (greenBadge.includes(campaign.status))? "Vlt-green": "Vlt-grey";
                
                const startDate = new moment(campaign.campaignStartDate).local().format("DD MMMM YYYY");
                const endDate = new moment(campaign.campaignEndDate).local().format("DD MMMM YYYY");
                const number = ((currentPage - 1) * limit) + index + 1

                return(
                  <TableBodyRow key={campaign.id}>
                    <TableColumn>
                      <NumberIndicator number={number} />
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
              }
            )
          }
        </TableBody>
      </Table>
      <Pagination 
        totalData={
          campaigns
          .filter((campaign) => {
            const filter = selectedFilter.split("|");
            if(selectedFilter === "all") return true;
            else if(filter.includes(campaign.status)) return true;
            else return false;
          })
          .length
        } 
        limit={limit} 
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </React.Fragment>
  )
}
export default NormalTable;