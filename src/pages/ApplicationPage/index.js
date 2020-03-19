import React from "react";

import ApplicationTable from "components/ApplicationTable";
import ApplicationInformationCard from "components/ApplicationInformationCard";
import Header from "./Header";

function ApplicationPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  return (
    <React.Fragment>
      <Header setRefreshToken={setRefreshToken} />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <ApplicationTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <ApplicationInformationCard />
        </div>
      </div>
    </React.Fragment>
  )
}
export default ApplicationPage;