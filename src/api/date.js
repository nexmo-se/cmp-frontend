import * as Moment from "moment";
import { extendMoment } from "moment-range";

class DateAPI{
  static getRangeFromNow(duration="day"){
    const moment = extendMoment(Moment);
    const toDate = new moment();
    const fromDate = (duration === "day")? new moment(toDate).subtract(30, "day"):
                     (duration === "week")? new moment(toDate).subtract(4, "week"):
                     (duration === "month")? new moment(toDate).subtract(6, "month"): new moment();
    const range = Array.from(new moment().range(fromDate, toDate).by(duration));
    return range;
  }
}
export default DateAPI;
