import ApiKey from "entities/apiKey";

import useStyles from "./styles";
import { useState } from "react";

import DetailColumn from "../DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";

interface NormalTableProps {
  apiKeys: ApiKey[];
  limit?: number;
}

function NormalTable ({ apiKeys, limit = 10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const mStyles = useStyles();

  return (
    <>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header />
            <Table.Header className={mStyles.nameWidth}>
              NAME
            </Table.Header>
            <Table.Header>APPS</Table.Header>
            <Table.Header>CHANNELS</Table.Header>
            <Table.Header className={mStyles.nameWidth} />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {
            apiKeys
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map(
              (apiKey, index) => {
                const number = (currentPage - 1) * limit + index + 1
                return(
                  <Table.BodyRow key={apiKey.id}>
                    <Table.Column>
                      <NumberIndicator number={number} />
                    </Table.Column>
                    <Table.Column className={mStyles.nameWidth}>
                      <p className="Vlt-truncate">
                        <b>{apiKey.name} ({apiKey.key})</b>
                      </p>
                      <p className="Vlt-grey Vlt-truncate">{apiKey.id}</p>
                    </Table.Column>
                    <Table.Column className="Vlt-right">
                      {apiKey.applications?.length ?? "-"}
                    </Table.Column>
                    <Table.Column className="Vlt-right">
                      {apiKey.channels?.length ?? "-"}
                    </Table.Column>
                    <DetailColumn apiKey={apiKey} />
                  </Table.BodyRow>
                )
              }
            )
          }
        </Table.Body>
      </Table>
      <Pagination 
        totalData={apiKeys.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}
export default NormalTable;