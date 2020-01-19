import React from "react";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";

function ApiKeyTable(props){
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader># APPS</TableHeader>
          <TableHeader># CHANNELS</TableHeader>
          <TableHeader># USERS</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((apiKey) => {
          return(
            <TableRow key={apiKey.id}>
              <TableColumn>{apiKey.id}</TableColumn>
              <TableColumn>{apiKey.name}</TableColumn>
              <TableColumn>{apiKey.key}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.applications.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.channels.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.users.length}</TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

ApiKeyTable.defaultProps = { data: [] }
export default ApiKeyTable;