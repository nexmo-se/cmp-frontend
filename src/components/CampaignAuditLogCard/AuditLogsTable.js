import React from "react";
import moment from "moment";
import { titleCase } from "title-case";

import RowHeader from "./RowHeader";
import Row from "./Row";

function AuditLogsTable({ campaign }){
  const [ logs, setLogs ] = React.useState([]);

  React.useEffect(() => {
    if(campaign) setLogs(campaign.cmpCampaignStatusAudits);
  }, [ campaign ])

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