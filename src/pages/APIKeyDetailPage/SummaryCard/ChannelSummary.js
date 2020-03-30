import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import useError from "hooks/error";
import SuccessMessage from "entities/success";
import AddChannelModal from "components/AddChannelModal";

const useStyles = makeStyles(() => ({
  title: { 
    paddingTop: 0,
    marginBottom: 0
  }
}))

function ChannelSummary({ apiKey, channels, setRefreshToken }){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();
  const mError = useError();

  function handleCreateClick(){
    setVisible(true);
  }

  function handleAdded(){
    setVisible(false);
    mError.throwSuccess(new SuccessMessage("Channel has been created"));
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <p><b>Channels</b></p>
      <h1 className={mStyles.title}>{channels.length}</h1>
      <div className="Vlt-grid Vlt-margin--A-top2">
        <div className="Vlt-col Vlt-center">
          <Link onClick={handleCreateClick}>Create Channel</Link>
        </div>
      </div>
      <AddChannelModal 
        visible={visible}
        setVisible={setVisible}
        apiKey={apiKey}
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default ChannelSummary;