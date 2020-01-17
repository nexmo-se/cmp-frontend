import React from "react";

import ApiKeyTable from "components/ApiKeyTable";
import AddNewApiKey from "components/AddNewApiKey";

function ApiKeyDashboard(props){
  const { dummy } = props;
  const dummyData = [
    { 
      id: "80653b38-5783-4093-abf7-e304436dba50",
      name: "Main Key", key: "056344dd",
      applications: [{}, {}], channels: [{}], users: []
    },
    { 
      id: "780952c4-9f29-45d5-a486-79b6463ec165",
      name: "Secondary Key", key: "ed9a64af",
      applications: [], channels: [], users: []
    }
  ];

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

      <div className="Vlt-gird">
        <div className="Vlt-col Vlt-card" style={{ padding: 0, borderRadius: 0 }}>
          <div className="Vlt-card__content">
            <ApiKeyTable data={dummy? dummyData: []}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ApiKeyDashboard;