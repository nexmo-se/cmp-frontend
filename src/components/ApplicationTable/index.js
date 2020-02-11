import React from "react";

import useApplication from "hooks/application";
import { UserContext } from "contexts/user";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableHeader from "components/Table/TableHeader";
import DetailColumn from "components/Table/DetailColumn";
import Empty from "components/Empty";

function ApplicationTable({ refreshToken }){
  const { token } = React.useContext(UserContext);
  const application = useApplication(token);

  React.useEffect(() => {
    application.list();
  }, [ refreshToken ])
      
  if(application.data.length <= 0) return <Empty />
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>APPLICATION ID</TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader># CHANNELS</TableHeader>
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {application.data.map((application) => {
          return (
            <TableRow key={application.id}>
              <TableColumn>{application.applicationId}</TableColumn>
              <TableColumn>{application.name}</TableColumn>
              <TableColumn>{application.apiKey.name}</TableColumn>
              <TableColumn className="Vlt-center">{application.cmpChannels.length}</TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
export default ApplicationTable;