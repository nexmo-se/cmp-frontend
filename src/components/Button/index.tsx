import clsx from "clsx";
import useStyles from "./styles";

export interface ButtonProps {
  children: any;
  type?: string;
  onClick?: () => (Promise<void> | void);
  disabled?: boolean;
  className?: string;
  buttonStyle?: string;
  buttonType?: "button" | "reset" | "submit";
}

function Button (props: ButtonProps) {
  const { 
    children,
    type = "tertiary",
    onClick,
    disabled,
    className,
    buttonStyle = "app",
    buttonType = "button"
  } = props;

  const mStyles = useStyles();

  return (
    <button 
      type={buttonType}
      className={
        clsx(
          "Vlt-btn", 
          `Vlt-btn--${type}`,
          `Vlt-btn--${buttonStyle}`,
          (disabled)? mStyles.disabled: "",
          className
        )
      } 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button;