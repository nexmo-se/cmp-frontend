import Template from "entities/template";

import useStyles from "./styles";
import { useState } from "react";

import DetailColumn from "../DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";

interface NormalTableProps {
  templates: Template[];
  limit?: number;
}

function NormalTable ({ templates, limit=10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const mStyles = useStyles();

  return (
    <>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header />
            <Table.Header className={mStyles.nameWidth}>NAME</Table.Header>
            <Table.Header>CHANNEL</Table.Header>
            <Table.Header>API KEY</Table.Header>
            <Table.Header />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {templates.slice((currentPage - 1) * limit, currentPage * limit).map((template, index) => {
            const number = (currentPage - 1) * limit + index + 1;
            return(
              <Table.BodyRow key={template.id}>
                <Table.Column>
                  <NumberIndicator number={number} />
                </Table.Column>
                <Table.Column className={mStyles.nameWidth}>
                  <p>
                    <b>{template.name}</b>
                  </p>
                  <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 250 }}>
                    {template.id}
                  </p>
                </Table.Column>
                <Table.Column>{template.channel.name}</Table.Column>
                <Table.Column>{template?.channel.apiKey?.name}</Table.Column>
                <DetailColumn template={template} />
              </Table.BodyRow>
            )
          })}
        </Table.Body>
      </Table>
      <Pagination 
        totalData={templates.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}
export default NormalTable;