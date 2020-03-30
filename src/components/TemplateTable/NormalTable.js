import React from "react";

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

function NormalTable({ templates, setRefreshToken, limit=10 }){
  const [ currentPage, setCurrentPage ] = React.useState(1);

  return (
    <React.Fragment>
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
          {templates.slice((currentPage - 1) * limit, currentPage * limit).map((template, index) => {
            const number = (currentPage - 1) * limit + index + 1;
            return(
              <TableBodyRow key={template.id}>
                <TableColumn>
                  <NumberIndicator number={number} />
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
      <Pagination 
        totalData={templates.length}
        limit={limit}
        onChange={setCurrentPage}
      />
    </React.Fragment>
  )
}
export default NormalTable;