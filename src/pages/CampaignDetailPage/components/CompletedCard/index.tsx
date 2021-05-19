import { useReportData } from "../SummaryReport";

import StatsNumber from "../StatsNumber";
import StatsCard from "../StatsCard";

function CompletedCard () {
  const { report } = useReportData();
  
  if (!report) return null;
  else {
    return (
      <StatsCard
        visible={report.completed !== undefined}
        iconName="Vlt-icon-check-bold"
        backgroundColor="Vlt-gradient--blue-to-purple"
        label="COMPLETED"
        value={(
          <StatsNumber
            left={report.completed ?? 0}
            right={report.total ?? 0}
          />
        )}
      />
    )
  }
}

export default CompletedCard;
