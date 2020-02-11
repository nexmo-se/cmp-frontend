import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import React from "react";
import ApiKeyAPI from "api/apiKey";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/Table/DetailColumn";

function ApiKeyTableComponent(props){
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
          <TableHeader />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((apiKey) => {
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

function ApiKeyTable(){
  const [ data, setData ] = React.useState([]);

  const listApiKey = async () => {
    const keys = ApiKeyAPI.listApiKey(process.env.REACT_APP_DUMMY_DATA);
    setData(keys);
  }

  React.useState(() => {
    listApiKey();
  }, [])

  return <ApiKeyTableComponent data={data}/>
}

export default ApiKeyTable;