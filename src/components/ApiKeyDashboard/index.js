import React from "react";
import uuid from "uuid/v4";

import APIKeyTable from "components/APIKeyTable";
import AddNewAPIKey from "components/AddNewAPIKey";

function APIKeyDashboard(){
  const [ refreshToken, setRefreshToken ] = React.useState();

  function handleAdded(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <div className="Vlt-grid Vlt-margin--A-top3">
        <div className="Vlt-col">
          <h5>ADD NEW API KEY</h5>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <AddNewAPIKey onAdded={handleAdded}/>
        </div>
      </div>

      <div className="Vlt-grid Vlt-margin--A-top3">
        <div className="Vlt-col">
          <h5>ALL API KEYS</h5>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <APIKeyTable refreshToken={refreshToken}/>
        </div>
      </div>
    </React.Fragment>
  );
}
export default APIKeyDashboard;