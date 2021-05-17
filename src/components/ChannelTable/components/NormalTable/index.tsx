import Channel from "entities/channel";

import useStyles from "./styles";
import { useState } from "react";

import DetailColumn from "../DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import Pagination from "components/Pagination";
import Table from "components/Table";

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
        <Table.Head>
          <Table.Row>
            <Table.Header/>
            <Table.Header>NAME</Table.Header>
            <Table.Header>SENDER ID</Table.Header>
            <Table.Header>TPS</Table.Header>
            <Table.Header className={mStyles.appWidth}>
              APP
            </Table.Header>
            <Table.Header>API KEY</Table.Header>
            <Table.Header />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {
            channels
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map(
                (channel, index) => {
                  const number = ((currentPage - 1) * limit) + index + 1;
                  const channelColor = generateColor(channel);
                  return (
                    <Table.BodyRow key={channel.id}>
                      <Table.Column>
                        <NumberIndicator number={number} />
                      </Table.Column>
                      <Table.Column>
                        <p>
                          <b>
                            {channel.name} &nbsp;|&nbsp;
                            <span className={channelColor}>{channel.channel}</span>
                          </b>
                        </p>
                        <p className="Vlt-grey Vlt-truncate" style={{ maxWidth: 150 }}>{channel.id}</p>
                      </Table.Column>
                      <Table.Column>{channel.senderId}</Table.Column>
                      <Table.Column className="Vlt-centre">
                        {channel.tps}
                      </Table.Column>
                      <Table.Column className={mStyles.appWidth}>
                        {channel.application?.name}
                      </Table.Column>
                      <Table.Column>{channel.apiKey?.name}</Table.Column>
                      <DetailColumn channel={channel} />
                    </Table.BodyRow>
                  )
                }
              )
            }
        </Table.Body>
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