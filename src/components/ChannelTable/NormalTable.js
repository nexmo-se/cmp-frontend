import React from "react";

import NumberIndicator from "components/NumberIndicator";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

import DetailColumn from "./DetailColumn";

function NormalTable({ channels, setRefreshToken, limit=10 }){
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader/>
          <TableHeader>NAME</TableHeader>
          <TableHeader>SENDER ID</TableHeader>
          <TableHeader>TPS</TableHeader>
          <TableHeader>APP</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {channels.slice(0, limit + 1).map((channel, index) => {
          const channelColor = (channel.channel === "sms")? "Vlt-orange": "Vlt-green";
          return(
            <TableBodyRow key={channel.id}>
              <TableColumn>
                <NumberIndicator number={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>
                    {channel.name} &nbsp;|&nbsp;
                    <span className={channelColor}>{channel.channel}</span>
                  </b>
                </p>
                <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 150 }}>{channel.id}</p>
              </TableColumn>
              <TableColumn>{channel.senderId}</TableColumn>
              <TableColumn className="Vlt-right">{channel.tps}</TableColumn>
              <TableColumn>{channel.application?.name}</TableColumn>
              <TableColumn>{channel.apiKey?.key}</TableColumn>
              <DetailColumn channel={channel} setRefreshToken={setRefreshToken} />
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;