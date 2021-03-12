import React from "react";

import ChannelTable from "components/ChannelTable";
import Header from "./Header";

function ChannelPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  return (
    <React.Fragment>
      <Header
        setRefreshToken={setRefreshToken}
      />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <ChannelTable
            refreshToken={refreshToken}
            setRefreshToken={setRefreshToken}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
export default ChannelPage;