import lodash from "lodash";
import { DateTime } from "luxon";

import { useReportData } from "../../../SummaryReport";
import { useEffect, useState } from "react";

import RowHeader from "../RowHeader";
import Row from "../Row";

type Log = {
  id: string;
  status: string;
  statusTime: DateTime;
}

interface GenerateStatusColorOptions {
  status: string;
}

function AuditLogsTable () {
  const [logs, setLogs] = useState<Log[]>([]);
  const { campaign } = useReportData();

  function generateStatusColor ({ status }: GenerateStatusColorOptions) {
    if (status === "completed") return "Vlt-green";
    else if (status === "started") return "Vlt-grey-darker";
    else return undefined;
  }

  // Sort the logs based on its status time
  // the latest event will be placed at the bottom of the table
  useEffect(
    () => {
      if (!campaign) return;
      if (!campaign.statusAudits) return;

      const logs = campaign.statusAudits
      .sort(
        (a, b) => {
          if (a.statusTime.toMillis() > b.statusTime.toMillis()) return 1;
          else if (a.statusTime.toMillis() < b.statusTime.toMillis()) return -1;
          else return 0;
        }
      ).map(
        (log) => ({
          id: log.id,
          status: log.status,
          statusTime: log.statusTime
        })
      )

      setLogs(logs);
    },
    [campaign]
  )

  return (
    <>
      <div className="Vlt-grid">
        <RowHeader>Time</RowHeader>
        <RowHeader>Status</RowHeader>
      </div>
      {
        logs.slice(0, 5).map((log) => {
          const time = log.statusTime.toLocaleString(DateTime.DATETIME_FULL);
          const statusColor = generateStatusColor({ status: log.status });

          return (
            <Row label={time}>
              <p className={statusColor}>
                <b>{lodash(log.status).startCase()}</b>
              </p>
            </Row>
          )
        })
      }
    </>
  )
}
export default AuditLogsTable;