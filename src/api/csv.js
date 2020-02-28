import Papa from "papaparse";

class CSVAPI{
  static generateBlaster(parameters=[]){
    const parameterSamples = parameters.map((parameter) => {
      const number = parameter.match(/\d+/g);
      return `parameter ${number}`;
    })

    const content = [
      [ "recipient", ...parameters ],
      [ "6588888888", ...parameterSamples ],
      [ "Do not remove example above. Fill your content right below this row. Please do not rename the file name as well." ]
    ]
    const strContent = content.map((e) => e.join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${strContent}`;
    return csvContent;
  }

  static async parse(file){
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => resolve(results)
      })
    })
  }
}
export default CSVAPI;