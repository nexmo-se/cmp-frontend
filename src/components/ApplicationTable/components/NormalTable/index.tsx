import Application from "entities/application";

import useStyles from "./styles";
import { useState } from "react";

import DetailColumn from "../DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

interface NormalTableProps {
  applications: Application[];
  limit?: number
}

function NormalTable ({ applications, limit=10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const mStyles = useStyles();

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader/>
            <TableHeader className={mStyles.nameWidth}>NAME</TableHeader>
            <TableHeader>API KEYS</TableHeader>
            <TableHeader>CHANNELS</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.slice((currentPage - 1) * limit, currentPage * limit).map((application, index) => {
            const number = ((currentPage - 1) * limit) + index + 1;
            return(
              <TableBodyRow key={application.id}>
                <TableColumn>
                  <NumberIndicator number={number} />
                </TableColumn>
                <TableColumn className={mStyles.nameWidth}>
                  <p>
                    <b>{application.name}</b>
                  </p>
                  <p className="Vlt-grey Vlt-truncate">{application.id}</p>
                </TableColumn>
                <TableColumn>{application.apiKey.name}</TableColumn>
                <TableColumn className="Vlt-center">{application.channels.length}</TableColumn>
                <DetailColumn application={application} />
              </TableBodyRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination 
        totalData={applications.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}
export default NormalTable;