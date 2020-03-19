import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  title: { marginBottom: 0 },
  smallTitle: { fontSize: "50%" }
}))

function DeliveryStatsCard({ channel, now, then }){
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <p><b>{channel.toUpperCase()} DELIVERY RATE</b></p>
      <div className="Vlt-grid">
        <div className="Vlt-col" style={{ alignSelf: "center" }}>
          <h1 className={mStyles.title}>
            <b>{now}%</b> &nbsp;
            <small className={mStyles.smallTitle}>
              <b className="Vlt-green">+{now - then}%</b>
            </small>
          </h1>
          <p className="Vlt-grey">Compared to {then}% last month</p>
        </div>
      </div>
    </React.Fragment>
  )
}
export default DeliveryStatsCard;