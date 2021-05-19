import { ButtonProps } from "components/Button";

import Spinner from "components/Spinner";
import Button from "components/Button";

interface MainProps {
  loading: boolean,
  disabled?: boolean,
  children?: any
  buttonType?: string;
}

type LoadingButtonProps = MainProps & ButtonProps;

function LoadingButton ({ loading, children, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button
      { ...props }
      type="secondary"
      disabled={loading || disabled}
    >
      {loading?(
        <Spinner className="Vlt-spinner--smaller" white />
      ): null}
      {children}
    </Button>
  )
}

export default LoadingButton;
