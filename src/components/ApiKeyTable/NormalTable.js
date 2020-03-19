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

function NormalTable({ apiKeys, setRefreshToken }){
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
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>APPS</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>CHANNELS</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")} />
        </TableRow>
      </TableHead>
      <TableBody>
        {apiKeys.map((apiKey, index) => {
          return(
            <TableRow 
              className={clsx(mStyles.tableRow)}
              key={apiKey.id}
            >
              <TableColumn>
                <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>{apiKey.name} ({apiKey.key})</b>
                </p>
                <p className="Vlt-grey">{apiKey.id}</p>
              </TableColumn>
              <TableColumn className="Vlt-right">{apiKey.cmpApplications.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.cmpChannels.length}</TableColumn>
              <DetailColumn apiKey={apiKey} setRefreshToken={setRefreshToken} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;