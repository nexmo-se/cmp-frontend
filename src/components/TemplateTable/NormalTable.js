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

function NormalTable({ templates, setRefreshToken, limit=10 }){
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
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>CHANNEL</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")}>API KEY</TableHeader>
          <TableHeader className={clsx(mStyles.headerCell, "Vlt-grey")} />
        </TableRow>
      </TableHead>
      <TableBody>
        {templates.slice(0, limit + 1).map((template, index) => {
          return(
            <TableRow 
              className={clsx(mStyles.tableRow)}
              key={template.id}
            >
              <TableColumn>
                <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>{template.name}</b>
                </p>
                <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 250 }}>{template.id}</p>
              </TableColumn>
              <TableColumn>{template.channel.name}</TableColumn>
              <TableColumn>{template?.channel.apiKey?.key}</TableColumn>
              <DetailColumn template={template} setRefreshToken={setRefreshToken} />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;