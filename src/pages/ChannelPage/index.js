import React from "react";

import ChannelTable from "components/ChannelTable";
import ChannelInformationCard from "components/ChannelInformationCard";

import Header from "./Header";

function ChannelPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  return (
    <React.Fragment>
      <Header setRefreshToken={setRefreshToken} />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <ChannelTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
        <div className="Vlt-col Vlt-col--1of4">
          <ChannelInformationCard />
        </div>
      </div>
    </React.Fragment>
  )
}
export default ChannelPage;