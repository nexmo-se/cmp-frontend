import React from "react";
import clsx from "clsx";
import { Line as Chart } from "react-chartjs-2";
import { makeStyles } from "@material-ui/styles";

import DateFilter from "./DateFilter";

const useStyles = makeStyles(() => ({
  headerContainer: { alignItems: "center" }
}))

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "Delivered",
      fill: false,
      borderColor: "#06ba77",
      data: [65, 59, 80, 81, 56, 55, 90]
    },
    {
      label: "Rejected",
      fill: false,
      borderColor: "#e84545",
      data: [80, 98, 83, 56, 79, 52, 49]
    },
  ]
};


function DeliveredCampaignChart({ height }){
  const mStyles = useStyles();
  
  const options = {
    elements: {
      
    },
    scales: {
      yAxes: [{
        gridLines: { drawOnChartArea: false }
      }]
    }
  }

  return (
    <div className="Vlt-card">
      <div className="Vlt-card__header">
        <div className={clsx("Vlt-grid", mStyles.headerContainer)}>
          <div className="Vlt-col">
            <h4>Delivered Campaign</h4>
          </div>
          <DateFilter />
        </div>
      </div>
      <div className="Vlt-card__content">
        <Chart data={data} height={height} options={options}/>
      </div>
    </div>
  )
}

export default DeliveredCampaignChart;