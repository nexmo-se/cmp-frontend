import Campaign from "entities/campaign";

import TableColumn from "components/Table/TableColumn";
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
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton campaign={campaign} />
      <DuplicateButton campaign={campaign} />
      <DownloadButton campaign={campaign} />
      <UploadButton campaign={campaign} />
      <StartButton campaign={campaign} />
      <PauseButton campaign={campaign} />
      <DeleteButton campaign={campaign} />
    </TableColumn>
  )
}
export default DetailColumn