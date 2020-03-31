import React from "react";
import { makeStyles } from "@material-ui/styles";

import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

import DetailColumn from "./DetailColumn";

const useStyles = makeStyles(() => ({
  appWidth: { maxWidth: 100 }
}))

function NormalTable({ channels, setRefreshToken, limit=10 }){
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader/>
            <TableHeader>NAME</TableHeader>
            <TableHeader>SENDER ID</TableHeader>
            <TableHeader>TPS</TableHeader>
            <TableHeader className={mStyles.appWidth}>APP</TableHeader>
            <TableHeader>API KEY</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {channels.slice((currentPage - 1) * limit, currentPage * limit).map((channel, index) => {
            const channelColor = (channel.channel === "sms")? "Vlt-orange": "Vlt-green";
            const number = ((currentPage - 1) * limit) + index + 1;
            return(
              <TableBodyRow key={channel.id}>
                <TableColumn>
                  <NumberIndicator number={number} />
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
                <TableColumn className={mStyles.appWidth}>{channel.application?.name}</TableColumn>
                <TableColumn>{channel.apiKey?.key}</TableColumn>
                <DetailColumn channel={channel} setRefreshToken={setRefreshToken} />
              </TableBodyRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination 
        totalData={channels.length}
        limit={limit}
        onChange={setCurrentPage}
      />
    </React.Fragment>
  )
}
export default NormalTable;