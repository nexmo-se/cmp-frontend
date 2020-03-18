import React from "react";

function StatsNumber({ left, right }){
  const [ leftString, setLeftString ] = React.useState("-");
  const [ rightString, setRightString ] = React.useState("-");

  React.useEffect(() => {
    if(left){
      const leftString = left.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setLeftString(leftString);
    }
  }, [ left ]);
  
  React.useEffect(() => {
    if(right){
      const rightString = right.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setRightString(rightString);
    }
  }, [ right ])

  return `${leftString}/${rightString}`
}
export default StatsNumber;