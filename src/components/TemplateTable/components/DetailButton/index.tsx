import Template from "entities/template";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

interface DetailButtonProps {
  template: Template;
}

function DetailButton ({ template }: DetailButtonProps) {
  const { push } = useHistory();

  function handleClick () {
    push(`/templates/${template.id}`);
  }

  return (
    <ButtonIcon
      icon="Vlt-icon-gear"
      onClick={handleClick}
    />
  )
}
export default DetailButton;