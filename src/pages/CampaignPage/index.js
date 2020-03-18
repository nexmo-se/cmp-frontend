import React from "react";
import uuid from "uuid/v4";

import AddButton from "components/AddButton";
import CampaignTable from "components/CampaignTable";
import AddCampaignModal from "components/AddCampaignModal";
import RefreshButton from "components/RefreshButton";

function CampaignPage(){
  const [ visible, setVisible ] = React.useState(false);
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  function refreshTable(){
    setRefreshToken(uuid());
  }

  function handleToggleModal(){
    setVisible((prevVisible) => !prevVisible);
  }
  
  return (
    <React.Fragment>
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-right">
          <AddButton onClick={handleToggleModal}>Add New Campaign</AddButton>
        </div>
      </div>

      <div className="Vlt-grid Vlt-margin--A-top3">
        <div className="Vlt-col" style={{ display: "flex", alignItems: "flex-end" }}>
          <h5>ALL CAMPAIGNS</h5>
        </div>
        <div className="Vlt-col Vlt-right">
          <RefreshButton onClick={refreshTable}/>
        </div>
      </div>

      <div className="Vlt-grid">  
        <div className="Vlt-col">
          <CampaignTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
      </div>
      <AddCampaignModal 
        visible={visible} 
        setVisible={setVisible} 
        onAdded={refreshTable} 
      />
    </React.Fragment>
  );
}
export default CampaignPage;