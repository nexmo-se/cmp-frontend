import React from "react";
import { v4 as uuid } from "uuid";

import Header from "./Header";
import ReportTable from "components/ReportTable";
import ReportInformationCard from "components/ReportInformationCard";

function ReportsPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(uuid());

  return (
    <div className="Vlt-grid">
      <div className="Vlt-col Vlt-grid__separator">
        <Header setRefreshToken={setRefreshToken} />
        <hr />
      </div>
      <div className="Vlt-col Vlt-col--2of3">
        <ReportTable refreshToken={refreshToken} />
      </div>
      <div className="Vlt-col Vlt-col--1of3">
        <ReportInformationCard />
      </div>
    </div>
  )
}
export default ReportsPage