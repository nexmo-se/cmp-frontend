import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  subheader: { marginBottom: 0 },
  headerLabel: { 
    paddingTop: 0,
    marginBottom: 0
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  },
  headerContainer: { 
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 24
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24
  }
}))