import clsx from "clsx";

interface NumberIndicatorProps {
  number: number;
  className?: string;
}

function NumberIndicator ({ number, className }: NumberIndicatorProps) {
  return (
    <div 
      className={
        clsx(
          "Vlt-number",
          "Vlt-number--dialer",
          className
        )
      }
      data-index={number} 
    />
  )
}
export default NumberIndicator;
