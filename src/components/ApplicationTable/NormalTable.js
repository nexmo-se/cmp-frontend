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

function NormalTable({ applications, setRefreshToken }){
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader/>
          <TableHeader>NAME</TableHeader>
          <TableHeader>API KEYS</TableHeader>
          <TableHeader>CHANNELS</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {applications.map((application, index) => {
          return(
            <TableBodyRow key={application.id}>
              <TableColumn>
                <NumberIndicator number={index + 1 } />
              </TableColumn>
              <TableColumn>
                <p>
                  <b>{application.name}</b>
                </p>
                <p className="Vlt-grey">{application.id}</p>
              </TableColumn>
              <TableColumn>{application.apiKey.name}</TableColumn>
              <TableColumn className="Vlt-right">{application.channels.length}</TableColumn>
              <DetailColumn application={application} setRefreshToken={setRefreshToken} />
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;