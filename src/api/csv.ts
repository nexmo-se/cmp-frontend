import Template from "entities/template"
import lodash from "lodash";

class CSVAPI {
  static generateBlaster (template: Template, mockRows: number = 0) {
    const generateParameterHeaders = (parameter: string) => {
      const number = parameter.match(/\d+/g);
      if (number) return `parameter ${number}`;
      else return undefined;
    }

    const parameterSamples = lodash(template.parameters).map(generateParameterHeaders).compact().value();
    const content = [
      [ "recipient", ...template.additionalColumns, ...template.parameterColumns ],
      [ "6588888888", ...template.additionalColumns, ...parameterSamples ],
      [ "Please add below this row. Above row(s) are sample for your reference. Do not remove this row."]
    ]
  
    for (let a=0; a < mockRows; a++) {
      content.push([ "6599999999", ...template.additionalColumns, ...parameterSamples ])
    }

    const strContent = content.map((e) => e.join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${strContent}`;
    return csvContent;
  }
}

export default CSVAPI;
