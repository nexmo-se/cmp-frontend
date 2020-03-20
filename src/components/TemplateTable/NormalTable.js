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

function NormalTable({ templates, setRefreshToken, limit=10 }){
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader />
          <TableHeader>NAME</TableHeader>
          <TableHeader>CHANNEL</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {templates.slice(0, limit + 1).map((template, index) => {
          return(
            <TableBodyRow key={template.id}>
              <TableColumn>
                <NumberIndicator number={index + 1} />
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
            </TableBodyRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
export default NormalTable;