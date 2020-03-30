import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import useError from "hooks/error";
import SuccessMessage from "entities/success";
import AddApplicationModal from "components/AddApplicationModal";

const useStyles = makeStyles(() => ({
  title: { 
    paddingTop: 0,
    marginBottom: 0
  }
}))

function ApplicationSummary({ setRefreshToken, apiKey, applications }){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();
  const mError = useError();

  function handleApplicationCreated(){
    setVisible(false);
    mError.throwSuccess(new SuccessMessage("Application has been created"));
    setRefreshToken(uuid());
  }

  function handleCreateApplicationClick(){
    setVisible(true);
  }

  return (
    <React.Fragment>
      <p><b>Applications</b></p>
      <h1 className={mStyles.title}>{applications.length}</h1>
      <div className="Vlt-grid Vlt-margin--A-top2">
        <div className="Vlt-col Vlt-center">
          <Link onClick={handleCreateApplicationClick}>Create Application</Link>
        </div>
      </div>
      <AddApplicationModal 
        visible={visible}
        setVisible={setVisible}
        apiKey={apiKey}
        onAdded={handleApplicationCreated}
      />
    </React.Fragment>
  )
}
export default ApplicationSummary;