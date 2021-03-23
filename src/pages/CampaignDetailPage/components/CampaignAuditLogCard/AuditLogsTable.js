// @flow
import React from "react";
import moment from "moment";
import Campaign from "entities/campaign";
import { DateTime } from "luxon";
import { titleCase } from "title-case";

import RowHeader from "./RowHeader";
import Row from "./Row";

interface AuditLogsTableProps {
  campaign: Campaign;
}

function AuditLogsTable ({ campaign }) {
  const [logs, setLogs] = React.useState([]);

  // Sort the logs based on its status time
  // the latest event will be placed at the bottom of the table
  React.useEffect(
    () => {
      if (campaign) {
        const logs = campaign.cmpCampaignStatusAudits
        .map(
          (log) => ({
            id: log.id,
            status: log.status,
            statusTime: DateTime.fromISO(log.statusTime)
          })
        )
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
            statusTime: log.statusTime.toISO()
          })
        )

        setLogs(logs);
      }
    },
    [campaign]
  )

  return (
    <React.Fragment>
      <div className="Vlt-grid">
        <RowHeader>Time</RowHeader>
        <RowHeader>Status</RowHeader>
      </div>
      {logs.slice(0, 5).map((log) => {
        const time = new moment(log.statusTime).format("DD MMMM YYYY HH:mmA");
        const statusColor = (log.status === "completed")? "Vlt-green":
                            (log.status === "started")? "Vlt-grey-darker": "";
        return (
          <Row label={time}>
            <p className={statusColor}>
              <b>{titleCase(log.status)}</b>
            </p>
          </Row>
        )
      })}
    </React.Fragment>
  )
}
export default AuditLogsTable;