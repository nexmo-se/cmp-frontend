import React from "react";

import NormalTableBodyRow from "./NormalTableBodyRow";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableBody from "components/Table/TableBody";
import Pagination from "components/Pagination";

function NormalTable({ reports, limit=10 }){
  const [ currentPage, setCurrentPage ] = React.useState(1);

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader />
            <TableHeader>NAME</TableHeader>
            <TableHeader>STATUS</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            reports
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((report, index) => {
              const number = (currentPage - 1) * limit + index + 1;
              return <NormalTableBodyRow index={number} report={report} />
            })
          }
        </TableBody>
      </Table>
      <Pagination 
        totalData={reports.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </React.Fragment>
  )
}
export default NormalTable;