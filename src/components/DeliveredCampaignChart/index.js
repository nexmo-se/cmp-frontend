import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "SMS",
      fill: false,
      backgroundColor: "#ff8f02",
      borderColor: "#ff8f02",
      data: [65, 59, 80, 81, 56, 55, 90]
    },
    {
      label: "WhatsApp",
      fill: false,
      backgroundColor: "#117bb8",
      borderColor: "#33aaee",
      data: [80, 98, 83, 56, 79, 52, 49]
    },
  ]
};


function DeliveredCampaignChart(props){
  const { height } = props;
  
  const options = {
    elements: {
      point: { radius: 0 }
    },
    scales: {
      yAxes: [{
        gridLines: { drawOnChartArea: false }
      }]
    }
  }

  return (
    <div className="Vlt-card">
      <div className="Vlt-card__content">
        <p><b>DELIVERED CAMPAIGN BY CHANNEL</b></p>
        <Line data={data} height={height} options={options}/>
      </div>
    </div>
  )
}

export default DeliveredCampaignChart;