import React from "react";

function TabsPanel(props){
  const { children, active } = props;
  return (
    <div className={`Vlt-tabs__panel ${active? "Vlt-tabs__panel_active": ""}`}>
      {children}
    </div>
  )
}
export default TabsPanel;