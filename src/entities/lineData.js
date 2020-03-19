class LineData{
  // label:string|void;
  // fill:boolean|void;
  // borderColor:string|void
  // data:Array<number>|void

  constructor(label, borderColor, data, fill=false){
    this.label = label;
    this.borderColor = borderColor;
    this.data = data;
    this.fill = fill;
  }

  toJSON(){
    return {
      label: this.label,
      fill: this.fill,
      borderColor: this.borderColor,
      data: this.data
    }
  }
}
export default LineData;