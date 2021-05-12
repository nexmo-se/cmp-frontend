import useStyles from "./styles";
import Spinner from "components/Spinner";

function FullPageSpinner(){
  const mStyles = useStyles();

  return (
    <div className={mStyles.container}>
      <Spinner />
    </div>
  )
}
export default FullPageSpinner;