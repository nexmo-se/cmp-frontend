import Application from "entities/application";

import useStyles from "./styles";
import { useState } from "react";

import DetailColumn from "../DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";

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
        <Table.Head>
          <Table.Row>
            <Table.Header/>
            <Table.Header className={mStyles.nameWidth}>NAME</Table.Header>
            <Table.Header>API KEYS</Table.Header>
            <Table.Header>CHANNELS</Table.Header>
            <Table.Header />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {applications.slice((currentPage - 1) * limit, currentPage * limit).map((application, index) => {
            const number = ((currentPage - 1) * limit) + index + 1;
            return(
              <Table.BodyRow key={application.id}>
                <Table.Column>
                  <NumberIndicator number={number} />
                </Table.Column>
                <Table.Column className={mStyles.nameWidth}>
                  <p>
                    <b>{application.name}</b>
                  </p>
                  <p className="Vlt-grey Vlt-truncate">{application.id}</p>
                </Table.Column>
                <Table.Column>{application.apiKey.name}</Table.Column>
                <Table.Column className="Vlt-center">{application.channels.length}</Table.Column>
                <DetailColumn application={application} />
              </Table.BodyRow>
            )
          })}
        </Table.Body>
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