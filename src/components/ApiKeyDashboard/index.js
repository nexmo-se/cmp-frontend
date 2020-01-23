import React from "react";

import ApiKeyTable from "components/ApiKeyTable";
import AddNewApiKey from "components/AddNewApiKey";

function ApiKeyDashboard(props){
  return (
    <React.Fragment>
      <div className="Vlt-grid Vlt-margin--A-top3">
        <div className="Vlt-col">
          <h5>ADD NEW API KEY</h5>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <AddNewApiKey/>
        </div>
      </div>

      <div className="Vlt-grid Vlt-margin--A-top3">
        <div className="Vlt-col">
          <h5>ALL API KEYS</h5>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <div className="Vlt-card">
            <div className="Vlt-card__content">
              <ApiKeyTable/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ApiKeyDashboard;