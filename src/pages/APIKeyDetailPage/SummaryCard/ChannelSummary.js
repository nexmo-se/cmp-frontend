import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: { 
    paddingTop: 0,
    marginBottom: 0
  }
}))

function ChannelSummary({ channels }){
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <p><b>Channels</b></p>
      <h1 className={mStyles.title}>{channels.length}</h1>
      <div className="Vlt-grid Vlt-margin--A-top2">
        <div className="Vlt-col Vlt-center">
          <Link>Assign Channel</Link>
        </div>
        <div className="Vlt-col Vlt-center">
          <Link>Create Channel</Link>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ChannelSummary;