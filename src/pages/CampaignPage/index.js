import React from "react";

import CampaignTable from "components/CampaignTable";
import Header from "./Header";

function CampaignPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);
  
  return (
    <React.Fragment>
      <Header setRefreshToken={setRefreshToken} />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
      </div>
    </React.Fragment>
  );
}
export default CampaignPage;