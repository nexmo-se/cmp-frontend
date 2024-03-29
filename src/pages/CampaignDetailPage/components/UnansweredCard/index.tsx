import { useReportData } from "../SummaryReport";

import StatsNumber from "../StatsNumber";
import StatsCard from "../StatsCard";

function UnansweredCard () {
  const { report } = useReportData();

  if (!report) return null;
  else {
    return (
      <StatsCard
        visible={report.unanswered !== undefined}
        iconName="Vlt-icon-cross-circle"
        backgroundColor="Vlt-gradient--pink-to-peach"
        label="UNANSWERED"
        value={(
          <StatsNumber
            left={report.unanswered ?? 0}
            right={report.total ?? 0}
          />
        )}
      />
    )
  }
}

export default UnansweredCard;
