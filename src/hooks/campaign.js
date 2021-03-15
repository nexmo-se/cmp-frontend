import React from "react";
import Config from "config";
import moment from "moment";

import FetchAPI from "api/fetch";
import DateAPI from "api/date";

import Campaign from "entities/campaign";
import Report from "entities/report";
import ChartData from "entities/chartData";
import LineData from "entities/lineData";

function useCampaign (token) {
  const [data, setData] = React.useState([]);

  const list = React.useCallback(
    async () => {
      const url = `${Config.apiDomain}/campaigns`;
      const responseData = await FetchAPI.get(url, token);
      const newData = responseData.map((data) => Campaign.fromJSON(data))
      setData(newData);
    },
    [token]
  )

  async function create(campaign){
    const url = `${Config.apiDomain}/campaigns`;
    await FetchAPI.post(url, token, JSON.stringify(campaign.toJSON()));
  }

  async function retrieve(campaign){
    const url = `${Config.apiDomain}/campaigns/${campaign.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Campaign.fromJSON(responseData);
    else return null;
  }

  async function updateStatus(campaign, status){
    const url = `${Config.apiDomain}/campaigns/${campaign.id}/status`
    const body = { status }
    await FetchAPI.put(url, token, JSON.stringify(body));
  }

  async function remove(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns/${campaign.id}`;
    await FetchAPI.remove(url, token);
  }

  async function summaryReport(campaign, from, to){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports/json`;
    const payload = {
      type: "campaign_summary",
      content: {
        cmpCampaignId: campaign.id,
        to,
        from
      }
    };
    const responseData = await FetchAPI.post(url, token, JSON.stringify(payload));
    if(responseData) return Report.fromJSON(responseData);
    else return null;
  }

  async function overallSummaryReport(from, to){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports/json`;
    const payload = {
      type: "overall_summary",
      content: {
        limit: 100,
        offset: 0,
        to,
        from
      }
    };

    const responseData = await FetchAPI.post(url, token, JSON.stringify(payload));
    console.log(to, from, responseData);
    if(responseData) return responseData.results.map((report) => Report.fromJSON(report));
    else return null;
  }

  async function lineChart(campaign, filter="day"){
    const range = DateAPI.getRangeFromNow(filter);
    const labels = range.map((date) => date.format("MMM DD"));
    
    const reportData = await Promise.all(range.map((date) => {
      const fromDate = new moment(date).startOf(filter);
      const toDate = new moment(date).endOf(filter);
      return summaryReport(campaign, fromDate.toISOString(), toDate.toISOString());
    }))
    
    const rejectedLineData = new LineData(
      "Rejected",
      "#e84545",
      reportData.map((report) => report?.rejected || 0)
    );

    const deliveredLineData = new LineData(
      "Delivered",
      "#06ba77",
      reportData.map((report) => report?.delivered || 0)
    )

    const chartData = new ChartData(labels, [
      rejectedLineData,
      deliveredLineData
    ]);
    return chartData;
  }

  async function overallLineChart(filter="day"){
    const range = DateAPI.getRangeFromNow(filter);
    const labels = range.map((date) => date.format("MMM DD"));

    const reportData = await Promise.all(range.map(async (date) => {
      const fromDate = new moment(date).startOf(filter);
      const toDate = new moment(date).endOf(filter);
      const reports = await overallSummaryReport(fromDate.toISOString(), toDate.toISOString());
      const overallReport = new Report();
      reports.forEach((report) => {
        console.log(report);
        overallReport.totalRecord = report.totalRecord;
        overallReport.delivered = report.delivered;
        overallReport.rejected = report.rejected;
      })
      console.log(overallReport);
      return overallReport;
    }))
    console.log(reportData);

    const rejectedLineData = new LineData(
      "Rejected",
      "#e84545",
      reportData.map((report) => report.rejected)
    );

    const deliveredLineData = new LineData(
      "Delivered",
      "#06ba77",
      reportData.map((report) => report.delivered)
    )

    const chartData = new ChartData(labels, [
      rejectedLineData,
      deliveredLineData
    ]);
    return chartData;
  }

  async function exportDetailReport(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports/csv`;
    const payload = {
      type: "campaign_detail",
      name: campaign.name,
      content: {
        cmpCampaignId: campaign.id
      }
    }
    await FetchAPI.post(url, token, JSON.stringify(payload));
  }

  return {
    data, 
    list, 
    create, 
    retrieve, 
    updateStatus, 
    remove ,
    summaryReport,
    overallSummaryReport,
    lineChart,
    overallLineChart,
    exportDetailReport
  };
}
export default useCampaign;