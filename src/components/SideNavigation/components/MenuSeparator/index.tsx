interface MenuSeparatorProps {
  children?: any;
}

function MenuSeparator ({ children }: MenuSeparatorProps) {
  return (
    <li>
      <h5 className="Vlt-sidemenu__title ">{children}</h5>
    </li>
  )
}

export default MenuSeparator;
