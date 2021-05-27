interface ModalFooterProps {
  children?: any;
}

function ModalFooter ({ children }: ModalFooterProps) {
  return (
    <div className="Vlt-modal__footer">
      {children}
    </div>
  )
}

export default ModalFooter;
