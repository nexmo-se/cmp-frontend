import ApiKey from "entities/apiKey";
import clsx from "clsx";

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
  apiKeys: ApiKey[];
  limit?: number;
}

function NormalTable ({ apiKeys, limit = 10 }: NormalTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const mStyles = useStyles();

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader />
            <TableHeader className={mStyles.nameWidth}>
              NAME
            </TableHeader>
            <TableHeader>APPS</TableHeader>
            <TableHeader>CHANNELS</TableHeader>
            <TableHeader className={mStyles.nameWidth} />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            apiKeys
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map(
              (apiKey, index) => {
                const number = (currentPage - 1) * limit + index + 1
                return(
                  <TableBodyRow key={apiKey.id}>
                    <TableColumn>
                      <NumberIndicator number={number} />
                    </TableColumn>
                    <TableColumn className={mStyles.nameWidth}>
                      <p className="Vlt-truncate">
                        <b>{apiKey.name} ({apiKey.key})</b>
                      </p>
                      <p className="Vlt-grey Vlt-truncate">{apiKey.id}</p>
                    </TableColumn>
                    <TableColumn className="Vlt-right">
                      {apiKey.applications.length}
                    </TableColumn>
                    <TableColumn className="Vlt-right">
                      {apiKey.channels.length}
                    </TableColumn>
                    <DetailColumn apiKey={apiKey} />
                  </TableBodyRow>
                )
              }
            )
          }
        </TableBody>
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