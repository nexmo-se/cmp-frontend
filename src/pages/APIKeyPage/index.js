import React from "react";

import APIKeyTable from "components/APIKeyTable";
import APIKeyInformationCard from "components/APIKeyInformationCard";

import Header from "./Header";

function APIKeyPage(){
  const [refreshToken, setRefreshToken] = React.useState(null);

  return (
    <React.Fragment>
      <Header setRefreshToken={setRefreshToken} />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">          
          <APIKeyTable 
            refreshToken={refreshToken} 
            setRefreshToken={setRefreshToken}
          />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <APIKeyInformationCard />
        </div>
      </div>
    </React.Fragment>
  )
}
export default APIKeyPage;