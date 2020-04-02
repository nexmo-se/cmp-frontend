import React from "react";
import clsx from "clsx";
import VoltaIcon from "components/VoltaIcon";

function NestedMenu({ icon, label, children, active }){
  const [ expand, setExpand ] = React.useState(active);
  
  function handleMenuClick(){
    setExpand((prevExpand) => !prevExpand);
  }

  React.useEffect(() => {
    if(active !== expand) setExpand(active);
  }, [ active ]);

  return (
    <li>
      <div 
        className={clsx(
          "Vlt-sidemenu__trigger",
          expand? "Vlt-sidemenu__trigger_active": ""
        )}
        onClick={handleMenuClick}
      >
        <VoltaIcon icon={icon} />
        <span className="Vlt-sidemenu__label">{label}</span>
      </div>
      <ul>{children}</ul>
    </li>
  )
}
export default NestedMenu;