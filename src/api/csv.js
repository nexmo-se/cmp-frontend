class CSVAPI{
  static generateBlaster(){
    const content = [
      [ "recipient", "activeTime", "duration", "activeOnWeekends", "timezone" ],
      [ "6585773051", "08:00", 10, "yes", "Asia/Singapore", "1234" ],
      [ "6585773061", "08:00", 10, "no", "Asia/Singapore", "4567" ],
      [ "Do not remove example above. Fill your content right below this row" ]
    ]
    const strContent = content.map((e) => e.join(",")).join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${strContent}`;
    return csvContent;
  }
}
export default CSVAPI;