import clsx from "clsx";

interface ModalContentprops {
  children?: any;
  className?: string;
}

function ModalContent ({ children, className }: ModalContentprops) {
  return (
    <div
      className={
        clsx(
          "Vlt-modal__content",
          className
        )
      }
    >
      {children}
    </div>
  )
}

export default ModalContent;
