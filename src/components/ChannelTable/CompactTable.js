import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    cursor: "pointer"
  },
  nameContainer: { 
    flexGrow: 1,
    marginLeft: 16
  },
  name: { marginBottom: 0 }
}))

function CompactTable({ channels, limit=5 }){
  const mStyles = useStyles();
  return channels.slice(0, limit + 1).map((channel, index) => {
    const channelColor = (channel.channel === "sms")? "Vlt-orange": "Vlt-green"
    return (
      <div key={channel.id} className={mStyles.container}>
        <div className="Vlt-number Vlt-number--dialer" data-index={index + 1} />
        <div className={mStyles.nameContainer}>
          <p className={mStyles.name}>
            <b>
              {channel.name} &nbsp;|&nbsp;
              <span className={channelColor}>{channel.channel}</span>
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
export default CompactTable;
