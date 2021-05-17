import Campaign from "entities/campaign";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Button from "components/Button";

import DetailColumn from "../DetailColumn";
import Filter from "../Filter";
import Modals from "../Modals";

import GenerateCSVModal from "components/GenerateCSVModal";
import UploadRecordModal from "components/UploadRecordModal";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

interface NormalTableProps {
  campaigns: Campaign[];
  limit: number;
}

interface GenerateBadgeBackgroundOptions {
  status: string;
}

function NormalTable ({ campaigns, limit = 10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<string>("draft");
  const [donwloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>();

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
                const badgeBackground = generateBadgeBackground(campaign.status);
                const startDate = campaign.campaignStartDate.toLocaleString(DateTime.DATE_FULL);
                const endDate = campaign.campaignEndDate.toLocaleString(DateTime.DATE_FULL);
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
                          <span className={badgeBackground}>
                            {campaign.status}
                          </span>
                        </b>
                      </p>
                      <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 300 }}>{campaign.id}</p>
                    </TableColumn>
                    <TableColumn>{startDate}</TableColumn>
                    <TableColumn>{endDate}</TableColumn>
                    <DetailColumn campaign={campaign} />
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
    </Modals>
  )
}
export default NormalTable;