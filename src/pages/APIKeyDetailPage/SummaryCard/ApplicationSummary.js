import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: { 
    paddingTop: 0,
    marginBottom: 0
  }
}))

function ApplicationSummary({ applications }){
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <p><b>Applications</b></p>
      <h1 className={mStyles.title}>{applications.length}</h1>
      <div className="Vlt-grid Vlt-margin--A-top2">
        <div className="Vlt-col Vlt-center">
          <Link>Assign Application</Link>
        </div>
        <div className="Vlt-col Vlt-center">
          <Link>Create Application</Link>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ApplicationSummary;