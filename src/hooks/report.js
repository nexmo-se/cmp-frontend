import React from "react";

import FetchAPI from "api/fetch";
import Report from "entities/report";

export default function useReport(token){
  const [ reports, setReports ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports`;
    const responseData = await FetchAPI.get(url, token);
    const reports = responseData.map((report) => Report.fromJSON(report));
    setReports(reports);
  }

  async function download(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports/archive/${campaign.id}.csv`;
    return FetchAPI.get(url, token, "blob");
  }

  return { reports, list, download }
}