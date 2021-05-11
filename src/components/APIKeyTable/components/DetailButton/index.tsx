import { useHistory } from "react-router-dom";
import ButtonIcon from "components/ButtonIcon";

function DetailButton({ apiKey }){
  const { push } = useHistory();
  
  function handleClick () {
    push(`/apikeys/${apiKey.id}`);
  }

  return (
    <ButtonIcon
      icon="Vlt-icon-gear"
      onClick={handleClick}
    />
  )
}

export default DetailButton;
