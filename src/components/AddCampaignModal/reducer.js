// @flow
import moment from "moment-timezone";

type Props = {
  name:string,
  fromDate:moment,
  fromTime:moment,
  toDate:moment,
  toTime:moment,
  activeStartTime:moment,
  activeEndTime:moment,
  activeOnWeekends:boolean,
  timezone:moment
}

export const initialState:Props = {
  name: "",
  fromDate: new moment(),
  fromTime: new moment().startOf("day").add(8, "hours"),
  toDate: new moment(),
  toTime: new moment().startOf("day").add(18, "hours"),
  activeStartTime: new moment().startOf("day").add(8, "hours"),
  activeEndTime: new moment().startOf("day").add(18, "hours"),
  activeOnWeekends: false, 
  timezone: moment.tz.guess()
}

export default function reducer(state:any, action:any){
  switch(action.type){
    case "CHANGE_VALUE":
      return Object.assign({}, state, { [action.valueName]: action.value });
    case "CLEAR_INPUT":
      return initialState;
    case "SET_INITIAL":
      return Object.assign({}, action.value);
    default:
      throw new Error("Ops! something went wrong");
  }
}