import React from "react";
import ChannelAPI from "api/channel";

import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import RowMenu from "components/ChannelTable/RowMenu";
import { Link } from "@material-ui/core";

function ChannelTableComponent(props){
  const { data } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader></TableHeader>
          <TableHeader>NAME</TableHeader>
          <TableHeader>SENDER ID</TableHeader>
          <TableHeader>TPS</TableHeader>
          <TableHeader>APPLICATION</TableHeader>
          <TableHeader>API KEY</TableHeader>
          <TableHeader></TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((channel) => {
          let badgeBackground = "Vlt-bg-green";
          if(channel.channel === "sms") badgeBackground = "Vlt-bg-orange"
          else if(channel.channel === "whatsapp") badgeBackground = "Vlt-bg-green";

          console.log(channel);
          return (
            <TableRow key={channel.id}>
              <TableColumn>
                <div className={`Vlt-badge ${badgeBackground} Vlt-white`}>{channel.channel}</div>
              </TableColumn>
              <TableColumn>{channel.name}</TableColumn>
              <TableColumn>{channel.senderId}</TableColumn>
              <TableColumn>{channel.tps}</TableColumn>
              <TableColumn><Link href="#">{channel.application.name}</Link></TableColumn>
              <TableColumn><Link href="#">{channel.apiKey.key}</Link></TableColumn>
              <TableColumn>
                <RowMenu/>
              </TableColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}

function ChannelTable(props){
  const [ data, setData ] = React.useState([]);

  const listChannel = async () => {
    const channels = await ChannelAPI.listChannel(process.env.REACT_APP_DUMMY_DATA);
    setData(channels);
  }

  React.useEffect(() => {
    listChannel();
  }, [])

  return <ChannelTableComponent data={data}/>
}
export default ChannelTable;