import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import { useHistory } from "react-router-dom";

interface SingleMenuProps {
  icon: string;
  label: string;
  active?: boolean;
  to?: string;
  onClick?: () => void;
}

function SingleMenu ({ icon, label, active, to, onClick }: SingleMenuProps) {
  const { push } = useHistory();

  function handleClick () {
    if (to) push(to);
    if (onClick) onClick();
  }

  return (
    <li onClick={handleClick}>
      <span className={`Vlt-sidemenu__link ${active? "Vlt-sidemenu__link_active": ""}`}>
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </span>
    </li>
  )
}

export default SingleMenu;
