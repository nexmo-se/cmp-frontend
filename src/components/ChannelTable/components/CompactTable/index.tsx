import Channel from "entities/channel";
import useStyles from "./styles";

interface CompactTableProps {
  channels: Channel[];
  limit?: number;
}

interface GenerateChannelColorOptions {
  channel: string;
}

function CompactTable ({ channels, limit=5 }: CompactTableProps) {
  const mStyles = useStyles();

  function generateChannelColor ({ channel }: GenerateChannelColorOptions) {
    if (channel === "sms") return "Vlt-orange";
    else if (channel === "whatsapp") return "Vlt-green";
    else if (channel === "viber") return "Vlt-purple";
    else return "Vlt-green";
  }

  return (
    <>
      {
        channels.slice(0, limit + 1).map((channel, index) => {
          const channelColor = channel.channel && generateChannelColor({ channel: channel.channel });
          
          return (
            <div
              key={channel.id}
              className={mStyles.container}
            >
              <div
                className="Vlt-number Vlt-number--dialer"
                data-index={index + 1}
              />
              <div className={mStyles.nameContainer}>
                <p className={mStyles.name}>
                  <b>
                    {channel.name} &nbsp;|&nbsp;
                    <span className={channelColor}>
                      {channel.channel}
                    </span>
                  </b>
                </p>
                <small className="Vlt-grey">
                  {channel.senderId} with {channel.tps} tps
                </small>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default CompactTable;
