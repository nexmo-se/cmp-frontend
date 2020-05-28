// @flow
import Papa from "papaparse";
import Template from "entities/template";

class CSVAPI{
  static generateBlaster(template:Template, mockRows:number=0){
    const parameters = template.body.match(/{{\d+}}/g) ?? [];
    const parameterSamples = parameters.map((parameter) => {
      const number = parseInt(parameter.match(/\d+/g));
      if(number) return `parameter ${number}`;
    })

    const parameterFields = parameters.map((parameter) => "parameter")

    const content = [
      [ "recipient", ...template.additionalColumns, ...parameterFields ],
      [ "6588888888", ...template.additionalColumns, ...parameterSamples ],
    ]
  
    for(let a=0; a < mockRows; a++){
      content.push([ "6599999999", ...template.additionalColumns, ...parameterSamples ])
    }

    const strContent = content.map((e) => e.join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${strContent}`;
    return csvContent;
  }
}
export default CSVAPI;