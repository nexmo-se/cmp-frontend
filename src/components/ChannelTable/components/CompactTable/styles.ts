import { makeStyles } from "@material-ui/styles";

export default  makeStyles(
  () => ({
    container: {
      display: "flex",
      flexDirection: "row",
      cursor: "pointer"
    },
    nameContainer: { 
      flexGrow: 1,
      marginLeft: 16
    },
    name: { marginBottom: 0 }
  }),
  { index: 1 }
)