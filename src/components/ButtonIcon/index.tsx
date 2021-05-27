import clsx from "clsx";
import VoltaIcon from "components/VoltaIcon";

interface ButtonIconProps {
  className?: string;
  type?: string;
  icon: string;
  onClick?: () => (Promise<void> | void);
  disabled?: boolean;
  style?: Record<string, any>
}

function ButtonIcon (props: ButtonIconProps) {
  const { className, type, icon, ...otherProps } = props;
  return (
    <button 
      {...otherProps}
      className={
        clsx(
          "Vlt-btn",
          `Vlt-btn--${type ?? "tertiary"}`,
          "Vlt-btn--icon",
          className
        )
      }
    >
      <VoltaIcon icon={icon} />
    </button>
  )
}
export default ButtonIcon;