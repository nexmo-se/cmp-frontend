import React from "react";

import useApplication from "hooks/application";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableHeader from "components/Table/TableHeader";
import DetailColumn from "components/ApplicationTable/DetailColumn";
import Empty from "components/Empty";

function ApplicationTable({ refreshToken, setRefreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mApplication = useApplication(token);

  React.useEffect(() => {
    mApplication.list().catch((err) => throwError(err));
  }, [ refreshToken ])
      
  if(mApplication.data.length <= 0) return <Empty />
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
        {mApplication.data.map((application) => {
          return (
            <TableRow key={application.id}>
              <TableColumn>{application.applicationId}</TableColumn>
              <TableColumn>{application.name}</TableColumn>
              <TableColumn>{application.apiKey.name}</TableColumn>
              <TableColumn className="Vlt-center">{application.cmpChannels.length}</TableColumn>
              <DetailColumn application={application} setRefreshToken={setRefreshToken}/>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
export default ApplicationTable;