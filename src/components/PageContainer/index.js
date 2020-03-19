import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "#f3f3f5"
  }
}))

function PageContainer({ children }){
  const mStyles = useStyles();
  return (
    <main className={mStyles.root}>
      {children}
    </main>
  )
}
export default PageContainer;