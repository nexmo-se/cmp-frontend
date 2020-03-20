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

function NormalTable({ apiKeys, setRefreshToken }){

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader />
          <TableHeader>NAME</TableHeader>
          <TableHeader>APPS</TableHeader>
          <TableHeader>CHANNELS</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {apiKeys.map((apiKey, index) => {
          return(
            <TableBodyRow key={apiKey.id}>
              <TableColumn>
                <NumberIndicator number={index + 1} />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>{apiKey.name} ({apiKey.key})</b>
                </p>
                <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 300 }}>{apiKey.id}</p>
              </TableColumn>
              <TableColumn className="Vlt-right">{apiKey.applications.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.channels.length}</TableColumn>
              <DetailColumn apiKey={apiKey} setRefreshToken={setRefreshToken} />
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;