import Channel from "entities/channel";

import useStyles from "./styles";
import { useState } from "react";

import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";
import TableHead from "components/Table/TableHead";
import TableRow from "components/Table/TableRow";
import TableHeader from "components/Table/TableHeader";
import TableColumn from "components/Table/TableColumn";
import TableBody from "components/Table/TableBody";
import TableBodyRow from "components/Table/TableBodyRow";

import DetailColumn from "../DetailColumn";

interface NormalTableProps {
  channels: Channel[];
  limit?: number;
}

function NormalTable (props: NormalTableProps) {
  const { channels, limit = 10 } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const mStyles = useStyles();

  function generateColor (channel: Channel) {
    if (!channel.channel) return "Vlt-green";

    switch (channel.channel) {
      case "sms":
        return "Vlt-orange";
      case "whatsapp":
        return "Vlt-green";
      case "viber": 
        return "Vlt-purple";
      case "voice":
        return "Vlt-teal";
      case "number_insight":
        return "Vlt-yellow";
      default:
        return "Vlt-green";
    }
  }

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader/>
            <TableHeader>NAME</TableHeader>
            <TableHeader>SENDER ID</TableHeader>
            <TableHeader>TPS</TableHeader>
            <TableHeader className={mStyles.appWidth}>
              APP
            </TableHeader>
            <TableHeader>API KEY</TableHeader>
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            channels
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map(
                (channel, index) => {
                  const number = ((currentPage - 1) * limit) + index + 1;
                  const channelColor = generateColor(channel);
                  return (
                    <TableBodyRow key={channel.id}>
                      <TableColumn>
                        <NumberIndicator number={number} />
                      </TableColumn>
                      <TableColumn>
                        <p>
                          <b>
                            {channel.name} &nbsp;|&nbsp;
                            <span className={channelColor}>{channel.channel}</span>
                          </b>
                        </p>
                        <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 150 }}>{channel.id}</p>
                      </TableColumn>
                      <TableColumn>{channel.senderId}</TableColumn>
                      <TableColumn className="Vlt-centre">
                        {channel.tps}
                      </TableColumn>
                      <TableColumn className={mStyles.appWidth}>
                        {channel.application?.name}
                      </TableColumn>
                      <TableColumn>{channel.apiKey?.name}</TableColumn>
                      <DetailColumn channel={channel} />
                    </TableBodyRow>
                  )
                }
              )
            }
        </TableBody>
      </Table>
      <Pagination 
        totalData={channels.length}
        limit={limit}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )
}
export default NormalTable;