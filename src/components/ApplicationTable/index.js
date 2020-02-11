import React from "react";
import ApplicationAPI from "api/application";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableHeader from "components/Table/TableHeader";
import DetailColumn from "components/Table/DetailColumn";

function ApplicationTableComponent(props){
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>APPLICATION ID</TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader># CHANNELS</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((application) => {
          return (
            <TableRow key={application.id}>
              <TableColumn>{application.applicationId}</TableColumn>
              <TableColumn>{application.name}</TableColumn>
              <TableColumn>{application.apiKey.key}</TableColumn>
              <TableColumn className="Vlt-center">{application.cmpChannels.length}</TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

function ApplicationTable(props){
  const [ data, setData ] = React.useState([]);

  const listApplication = async () => {
    const applications = await ApplicationAPI.listApplication(process.env.REACT_APP_DUMMY_DATA);
    setData(applications);
  }

  React.useEffect(() => {
    listApplication()
  }, [])

  return <ApplicationTableComponent data={data}/>
}

export default ApplicationTable;