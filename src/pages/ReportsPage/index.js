import React from "react";

import Header from "./Header";
import ReportTable from "components/ReportTable";
import ReportInformationCard from "components/ReportInformationCard";

function ReportsPage(){
  return (
    <div className="Vlt-grid">
      <div className="Vlt-col Vlt-grid__separator">
        <Header />
        <hr />
      </div>
      <div className="Vlt-col Vlt-col--2of3">
        <ReportTable />
      </div>
      <div className="Vlt-col Vlt-col--1of3">
        <ReportInformationCard />
      </div>
    </div>
  )
}
export default ReportsPage