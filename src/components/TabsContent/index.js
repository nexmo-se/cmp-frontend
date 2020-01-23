import React from "react";

function TabsContent(props){
  const { children } = props;
  return (
    <div className="Vlt-tabs__content">
      {children}
    </div>
  )
}
export default TabsContent;