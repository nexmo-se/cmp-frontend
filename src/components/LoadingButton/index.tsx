import Spinner from "components/Spinner";
import Button from "components/Button";

interface LoadingButtonProps {
  loading: boolean,
  disabled?: boolean,
  children?: any
  buttonType?: string;
}

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
