import Campaign from "entities/campaign";

import Table from "components/Table";
import DetailButton from "../DetailButton";
import DownloadButton from "../DownloadButton";
import StartButton from "../StartButton";
import PauseButton from "../PauseButton";
import UploadButton from "../UploadButton";
import DuplicateButton from "../DuplicateButton";
import DeleteButton from "../DeleteButton";

interface DetailColumnProps {
  campaign: Campaign;
}

function DetailColumn ({ campaign }: DetailColumnProps) {
  return (
    <Table.Column className="Vlt-table__cell--nowrap">
      <DetailButton campaign={campaign} />
      <DuplicateButton campaign={campaign} />
      <DownloadButton campaign={campaign} />
      <UploadButton campaign={campaign} />
      <StartButton campaign={campaign} />
      <PauseButton campaign={campaign} />
      <DeleteButton campaign={campaign} />
    </Table.Column>
  )
}
export default DetailColumn