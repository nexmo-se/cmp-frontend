import clsx from "clsx";

import useStyles from "./styles";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

interface PageHeaderProps {
  title: string;
  name: string;
  rightComponent?: any;
}

function PageHeader ({ title, name, rightComponent }: PageHeaderProps) {
  const mStyles = useStyles();
  const { goBack } = useHistory();

  function handleBackClick () {
    goBack();
  }

  return (
    <div className="Vlt-grid">
      <div
        className={
          clsx("Vlt-col", mStyles.headerContainer)
        }
      >
        <ButtonIcon
          icon="Vlt-icon-arrow-left"
          onClick={handleBackClick}
        />
        <div className={mStyles.header}>
          <p className={mStyles.subheader}>
            {title.toUpperCase()}
          </p>
          <h2 className={mStyles.headerLabel}>
            {name}
          </h2>
        </div>
      </div>
      <div
        className={
          clsx("Vlt-col", mStyles.rightContainer)
        }
      >
        {rightComponent}
      </div>
    </div>
  )
}

export default PageHeader;
