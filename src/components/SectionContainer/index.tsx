import clsx from "clsx";
import useStyles from "./styles";

interface SectionContainerProps {
  children?: any;
}

function SectionContainer ({ children }: SectionContainerProps) {
  const mStyles = useStyles();

  return (
    <main 
      className={
        clsx(mStyles.main, mStyles.mainLight)
      }
    >
      {children}
    </main>
  )
}
export default SectionContainer;