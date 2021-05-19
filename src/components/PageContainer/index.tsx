import useStyles from "./styles";

interface PageContainerProps {
  children?: any;
}

function PageContainer ({ children }: PageContainerProps) {
  const mStyles = useStyles();
  
  return (
    <main className={mStyles.root}>
      {children}
    </main>
  )
}
export default PageContainer;