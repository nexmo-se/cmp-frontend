import React from "react";
import uuid from "uuid/v4";

import TemplateTable from "components/TemplateTable";
import TemplateInformationCard from "components/TemplateInformationCard";
import Header from "./Header";

function TemplatePage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  return (
    <React.Fragment>
      <Header setRefreshToken={setRefreshToken} />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <TemplateTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <TemplateInformationCard />
        </div>
      </div>
    </React.Fragment>
  )
}
export default TemplatePage;