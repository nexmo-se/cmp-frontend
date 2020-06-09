import React from "react";
import { makeStyles } from "@material-ui/styles";

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

const useStyles = makeStyles(() => ({
  nameWidth: {
    maxWidth: 150
  }
}))

function NormalTable({ templates, setRefreshToken, limit=10 }){
  const [ currentPage, setCurrentPage ] = React.useState(1);
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader />
            <TableHeader className={mStyles.nameWidth}>NAME</TableHeader>
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
                <TableColumn className={mStyles.nameWidth}>
                  <p>
                    <b>{template.name}</b>
                  </p>
                  <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 250 }}>{template.id}</p>
                </TableColumn>
                <TableColumn>{template.channel.name}</TableColumn>
                <TableColumn>{template?.channel.apiKey?.name}</TableColumn>
                <DetailColumn template={template} setRefreshToken={setRefreshToken} />
              </TableBodyRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination 
        totalData={templates.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </React.Fragment>
  )
}
export default NormalTable;