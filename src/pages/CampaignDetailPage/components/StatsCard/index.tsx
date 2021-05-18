import clsx from "clsx";
import useStyles from "./styles";

import VoltaIcon from "components/VoltaIcon";

interface StatsCardProps {
  backgroundColor: string;
  visible: boolean;
  iconName: string;
  label: string;
  value: any;
}

function StatsCard (props: StatsCardProps) {
  const { backgroundColor, visible, iconName, label, value } = props;
  const mStyles = useStyles();

  if (!visible) return null;
  else {
    return (
      <div className="Vlt-col">
        <div
          className={
            clsx(
              "Vlt-card",
              "Vlt-card--clickable",
              backgroundColor,
              mStyles.normalCursor,
              mStyles.overflowHidden
            )
          }
        >
          <div
            className={
              clsx(
                "Vlt-card__content",
                mStyles.content
              )
            }
          >
            <VoltaIcon
              className={
                clsx(
                  "Vlt-white",
                  mStyles.largeIcon
                )
              }
              icon={iconName}
            />
            <div className={mStyles.dataContainer}>
              <p
                className={
                  clsx(
                    "Vlt-white",
                    mStyles.noMarginPadding
                  )
                }
              >
                {label}
              </p>
              <h4
                className={
                  clsx(
                    "Vlt-white",
                    mStyles.noMarginPadding
                  )
                }
              >
                {value}
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StatsCard;
