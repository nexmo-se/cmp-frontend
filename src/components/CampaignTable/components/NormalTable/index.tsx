import Campaign from "entities/campaign";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";

import DetailColumn from "../DetailColumn";
import Filter from "../Filter";
import Modals from "../Modals";
import Table from "components/Table";

interface NormalTableProps {
  campaigns: Campaign[];
  limit?: number;
}

interface GenerateBadgeBackgroundOptions {
  status: string;
}

function NormalTable ({ campaigns, limit = 10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("draft");

  function generateBadgeBackground ({ status }: GenerateBadgeBackgroundOptions) {
    const yellowBadge = [ "pending", "paused", "reporting" ];
    const greenBadge = [ "started", "completed" ];
    if (yellowBadge.includes(status)) return "Vlt-yellow";
    else if (greenBadge.includes(status)) return "Vlt-green";
    else return "Vlt-grey";
  }

  useEffect(
    () => setCurrentPage(1),
    [selectedFilter]
  )

  return (
    <Modals>
      <Filter onChange={setSelectedFilter} />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header />
            <Table.Header>NAME</Table.Header>
            <Table.Header>START DATE</Table.Header>
            <Table.Header>END DATE</Table.Header>
            <Table.Header>END DATE</Table.Header>
            <Table.Header />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {campaigns
            .filter(
              (campaign) => {
                const filter = selectedFilter.split("|");
                if (selectedFilter === "all") return true;
                else if (filter.includes(campaign.status)) return true;
                else return false;
              }
            ).slice((currentPage - 1) * limit, limit * currentPage).map(
              (campaign, index) => {
                console.log(campaign);
                const badgeBackground = generateBadgeBackground({ status: campaign.status });
                const startDate = campaign.campaignStartDate.toLocaleString(DateTime.DATE_FULL);
                const endDate = campaign.campaignEndDate.toLocaleString(DateTime.DATE_FULL);
                const number = ((currentPage - 1) * limit) + index + 1

                return(
                  <Table.BodyRow key={campaign.id}>
                    <Table.Column>
                      <NumberIndicator number={number} />
                    </Table.Column>
                    <Table.Column>
                      <p>
                        <b>
                          {campaign.name} &nbsp;|&nbsp;
                          <span className={badgeBackground}>
                            {campaign.status}
                          </span>
                        </b>
                      </p>
                      <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 300 }}>{campaign.id}</p>
                    </Table.Column>
                    <Table.Column>{startDate}</Table.Column>
                    <Table.Column>{endDate}</Table.Column>
                    <DetailColumn campaign={campaign} />
                  </Table.BodyRow>
                )
              }
            )
          }
        </Table.Body>
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
    </Modals>
  )
}
export default NormalTable;