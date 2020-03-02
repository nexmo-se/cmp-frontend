import moment from "moment-timezone";

export const initialState = {
  name: "",
  fromDate: "",
  fromTime: "",
  toDate: "",
  toTime: "",
  activeStartTime: "",
  activeEndTime: "",
  activeOnWeekends: false, 
  timezone: moment.tz.guess()
}

export default function reducer(state, action){
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