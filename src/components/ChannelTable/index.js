import React from "react";
import { Link } from "@material-ui/core";

import useChannel from "hooks/channel";
import { UserContext } from "contexts/user";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/Table/DetailColumn";
import Empty from "components/Empty";

function ChannelTable({ refreshToken }){
  const { token } = React.useContext(UserContext);
  const mChannel = useChannel(token);

  React.useEffect(() => {
    mChannel.list();
  }, [ refreshToken ])

  if(mChannel.data.length <= 0) return <Empty />
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>SENDER ID</TableHeader>
          <TableHeader>TPS</TableHeader>
          <TableHeader>APPLICATION</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {mChannel.data.map((channel) => {
          let badgeBackground = "Vlt-bg-green";
          if(channel.channel === "sms") badgeBackground = "Vlt-bg-orange"
          else if(channel.channel === "whatsapp") badgeBackground = "Vlt-bg-green";

          return (
            <TableRow key={channel.id}>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{channel.channel}</div>
              </TableColumn>
              <TableColumn>{channel.name}</TableColumn>
              <TableColumn>{channel.senderId}</TableColumn>
              <TableColumn>{channel.tps}</TableColumn>
              <TableColumn><Link href="#">{channel.application.name}</Link></TableColumn>
              <TableColumn><Link href="#">{channel.apiKey.key}</Link></TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
export default ChannelTable;