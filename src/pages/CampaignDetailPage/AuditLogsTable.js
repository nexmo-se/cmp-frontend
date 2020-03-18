import React from "react";
import moment from "moment";

import Badge from "components/Badge"
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableHeader from "components/Table/TableHeader";
import TableRow from "components/Table/TableRow";
import TableBody from "components/Table/TableBody";
import TableColumn from "components/Table/TableColumn";

function AuditLogsTable({ campaign }){
  const [ logs, setLogs ] = React.useState([]);

  React.useEffect(() => {
    if(campaign) setLogs(campaign.cmpCampaignStatusAudits);
  }, [ campaign ])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Time</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {logs.slice(1,3).map((log) => {
          const day = new moment(log.statusTime).format("dddd, DD MMMM YYYY HH:mmA")
          const statusColor = (log.status === "completed")? "Vlt-bg-green":
                              (log.status === "started")? "Vlt-bg-grey": ""
          return (
            <TableRow key={log.id}>
              <TableColumn>{day}</TableColumn>
              <TableColumn>
                <Badge className={statusColor}>{log.status}</Badge>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default AuditLogsTable;