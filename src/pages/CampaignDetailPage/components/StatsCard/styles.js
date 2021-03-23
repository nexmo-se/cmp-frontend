import { makeStyles } from "@material-ui/core";
export default makeStyles(() => ({
  normalCursor: { cursor: "unset" },
  overflowHidden: { overflow: "hidden" },
  noMarginPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }, 
  content: { 
    display: "flex",
    alignItems: "center",
  },
  largeIcon: {
    width: 64,
    height: 64,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  }
}), { index: 1 })