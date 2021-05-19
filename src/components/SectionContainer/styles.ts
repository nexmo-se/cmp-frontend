import { makeStyles } from "@material-ui/styles";

export default makeStyles(
  () => ({
    main: {
      flex: 1, 
      height: "100vh",
      overflowY: "auto",
      padding: "24px 32px"
    },
    mainLight: { background: "#f3f3f5" }
  }),
  { index: 1 }
)