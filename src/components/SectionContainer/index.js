import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  main: {
    flex: 1, 
    height: "100vh",
    overflowY: "auto",
    padding: "24px 32px"
  },
  mainLight: { background: "#f3f3f5" }
}))

function SectionContainer({ children }){
  const mStyles = useStyles();

  return (
    <main className={clsx(mStyles.main, mStyles.mainLight)}>
      {children}
    </main>
  )
}
export default SectionContainer;