import React from "react";
import TemplateAPI from "api/template";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/Table/DetailColumn";
import { Link } from "@material-ui/core";

function TemplateTableComponent(props){
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>CHANNEL</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((template) => {
          let badgeBackground = "Vlt-bg-green";
          if(template.channel.channel === "sms") badgeBackground = "Vlt-bg-orange"
          else if(template.channel.channel === "whatsapp") badgeBackground = "Vlt-bg-green";

          return (
            <TableRow key={template.id}>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{template.channel.channel}</div>
              </TableColumn>
              <TableColumn>{template.name}</TableColumn>
              <TableColumn><Link href="#">{template.channel.name}</Link></TableColumn>
              <TableColumn><Link href="#">{template.channel.apiKey.key}</Link></TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

function TemplateTable(props){
  const [ data, setData ] = React.useState([]);

  const listTemplate = async () => {
    const templates = await TemplateAPI.listTemplate(process.env.REACT_APP_DUMMY_DATA);
    setData(templates);
  }

  React.useEffect(() => {
    listTemplate();
  }, [])

  return <TemplateTableComponent data={data}/>
}
export default TemplateTable;