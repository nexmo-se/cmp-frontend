import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles"

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";

import DetailColumn from "./DetailColumn";

const useStyles = makeStyles((theme) => ({
  headerCell: { borderBottom: "none !important" },
  table: { 
    borderCollapse: "separate",
    borderSpacing: "0px 8px"
  },
  tableRow: { 
    backgroundColor: "#fff",
    padding: 24,
    cursor: "pointer",
    "& td": {
      border: "1px solid #e1e2e6",
      borderStyle: "solid none"
    },
    "& td:first-child": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      borderLeft: "1px solid #e1e2e6"
    },
    "& td:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      borderRight: "1px solid #e1e2e6"
    }
  }
}))

function NormalTable({ channels, setRefreshToken, limit=10 }){
  const mStyles = useStyles();

  return (
    <Table classes={{
      root: "Vlt-table--nohighlight",
      table: mStyles.table
    }}>
      <TableHead>
        <TableRow className={mStyles.rowHeader}>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")} />
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>NAME</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>SENDER ID</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>TPS</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>APPLICATION</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>API KEY</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")} />
        </TableRow>
      </TableHead>
      <TableBody>
        {channels.slice(0, limit + 1).map((channel, index) => {
          const channelColor = (channel.channel === "sms")? "Vlt-orange": "Vlt-green";
          return(
            <TableRow 
              className={clsx(mStyles.tableRow)}
              key={channel.id}
            >
              <TableColumn>
                <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>
                    {channel.name} &nbsp;|&nbsp;
                    <span className={channelColor}>{channel.channel}</span>
                  </b>
                </p>
                <p className="Vlt-grey">{channel.id}</p>
              </TableColumn>
              <TableColumn>{channel.senderId}</TableColumn>
              <TableColumn className="Vlt-right">{channel.tps}</TableColumn>
              <TableColumn>{channel.application?.name}</TableColumn>
              <TableColumn>{channel.apiKey?.key}</TableColumn>
              <DetailColumn channel={channel} setRefreshToken={setRefreshToken} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;