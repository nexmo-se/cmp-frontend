interface ButtonGroupProps {
  children?: any;
}

function ButtonGroup ({ children }: ButtonGroupProps) {
  return (
    <div className="Vlt-btn-group Vlt-btn-group--app">
      {children}
    </div>
  )
}

export default ButtonGroup;
