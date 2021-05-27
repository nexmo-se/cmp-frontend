import clsx from "clsx";

interface SpinnerProps {
  className?: string;
  white?: boolean;
}

function Spinner ({ className, white=false }: SpinnerProps) {
  return (
    <div 
      className={
        clsx(
          "Vlt-spinner",
          (white)? "Vlt-spinner--white": "" ,
          className
        )
      }
    />
  )
}
export default Spinner