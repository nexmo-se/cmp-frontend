class CSVAPI{
  static generateBlaster(){
    const content = [
      [ "recipient", "activeTime", "duration", "activeOnWeekends", "timezone" ],
      [ "6585773051", "08:00", 10, "yes", "Asia/Singapore", "VONAGE", "12345" ],
      [ "6585773061", "08:00", 10, "no", "Asia/Singapore", "VONAGE", "67890" ],
      [ "Do not remove example above. Fill your content right below this row. Please do not rename the file name as well." ]
    ]
    const strContent = content.map((e) => e.join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${strContent}`;
    return csvContent;
  }
}
export default CSVAPI;