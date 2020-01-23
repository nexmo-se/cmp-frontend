import React from "react";

function TabsItem(props){
  const { active, children } = props;
  return <li className={`Vlt-tabs__link ${active? "Vlt-tabs__link_active": ""}`}>{children}</li>
}
export default TabsItem;