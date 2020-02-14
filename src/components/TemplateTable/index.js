import React from "react";
import { Link } from "@material-ui/core";

import useTemplate from "hooks/template";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import DetailColumn from "components/Table/DetailColumn";
import Empty from "components/Empty";

function TemplateTable({ refreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mTemplate = useTemplate(token);

  React.useEffect(() => {
    mTemplate.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  if(mTemplate.data.length <= 0) return <Empty/>
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
        {mTemplate.data.map((template) => {
          let badgeBackground = "Vlt-bg-green";
          if(template.channel.channel === "sms") badgeBackground = "Vlt-bg-orange"
          else if(template.channel.channel === "whatsapp") badgeBackground = "Vlt-bg-green";

          return (
            <TableRow key={template.id}>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{template.channel.channel}</div>
              </TableColumn>
              <TableColumn>{template.name}</TableColumn>
              <TableColumn>
                <Link href="#">
                  {template.channel.name}
                </Link>
              </TableColumn>
              <TableColumn>
                <Link href="#">
                  {template.channel.apiKey.name}
                </Link>
              </TableColumn>
              <DetailColumn />
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
export default TemplateTable