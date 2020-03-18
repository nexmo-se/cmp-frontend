import React from "react";

import useRecord from "hooks/record";
import { UserContext } from "contexts/user";

import Badge from "components/Badge"
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableHeader from "components/Table/TableHeader";
import TableRow from "components/Table/TableRow";
import TableBody from "components/Table/TableBody";
import TableColumn from "components/Table/TableColumn";

function DeliveryLogsTable({ campaign }){
  const { token } = React.useContext(UserContext);
  const mRecord = useRecord(token);

  React.useEffect(() => {
    if(campaign) mRecord.retrieveFromCampaign(campaign);
  }, [ campaign ]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Channel</TableHeader>
          <TableHeader>Template</TableHeader>
          <TableHeader>Recipient</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {mRecord.data.map((record) => {
          const template = record.template;
          const channel = template.channel;
          const status = record.cmpRecordMessages[0].status;
          const statusColor = (status === "delivered")? "Vlt-bg-green":
                              (status === "rejected")? "Vlt-bg-red": ""

          return (
            <TableRow key={record.id}>
              <TableColumn>{channel.name}</TableColumn>
              <TableColumn>{template.name}</TableColumn>
              <TableColumn>{record.recipient}</TableColumn>
              <TableColumn>
                <Badge className={statusColor}>{status}</Badge>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default DeliveryLogsTable;