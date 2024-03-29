import { useReportData } from "../SummaryReport";

import StatsNumber from "../StatsNumber";
import StatsCard from "../StatsCard";

function DeliveryCard () {
  const { report } = useReportData();

  if (!report) return null;
  else {
    return (
      <StatsCard
        visible={report.delivered !== undefined}
        iconName="Vlt-icon-check-bold"
        backgroundColor="Vlt-gradient--blue-to-purple"
        label="DELIVERED"
        value={(
          <StatsNumber
            left={report.delivered ?? 0}
            right={report.total ?? 0}
          />
        )}
      />
    )
  }
}

export default DeliveryCard;
