import React from "react";

import useAPIKey from "hooks/apiKey";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Empty from "components/Empty";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/Table/DetailColumn";

function APIKeyTable({ refreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const apiKey = useAPIKey(token);

  React.useEffect(() => {
    apiKey.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  if(apiKey.data.length <= 0) return <Empty/>
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
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {apiKey.data.map((apiKey) => {
          return(
            <TableRow key={apiKey.id}>
              <TableColumn>{apiKey.id}</TableColumn>
              <TableColumn>{apiKey.name}</TableColumn>
              <TableColumn>{apiKey.key}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.cmpApplications.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.cmpChannels.length}</TableColumn>
              <TableColumn className="Vlt-right">{apiKey.users.length}</TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
export default APIKeyTable;
