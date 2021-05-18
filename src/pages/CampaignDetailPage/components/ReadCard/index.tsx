import useStyles from "./styles";
import { useReportData } from "../SummaryReport";

import StatsNumber from "../StatsNumber";
import StatsCard from "../StatsCard";

function ReadCard () {
  const mStyles = useStyles();
  const { report } = useReportData();

  if (!report) return null;
  else {
    return (
      <StatsCard
        visible={report.read !== undefined}
        iconName="Vlt-icon-check-double-bold"
        backgroundColor={mStyles.gradient}
        label="READ"
        value={(
          <StatsNumber
            left={report.read}
            right={report.total}
          />
        )}
      />
    )
  }
}

export default ReadCard;
