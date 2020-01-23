import React from "react";

function TabsHeader(props){
  const { className, children } = props;
  return <ul className={`Vlt-tabs__header ${className}`}>{children}</ul>
}
export default TabsHeader;