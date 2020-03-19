class ChartData{
  // labels:Array<string>|void;
  // datasets:any|void;

  constructor(labels, datasets){
    this.labels = labels;
    this.datasets = datasets;
  }

  toJSON(){
    return {
      labels: this.labels,
      datasets: this.datasets.map((dataset) => {
        return dataset.toJSON()
      })
    }
  }
}
export default ChartData;