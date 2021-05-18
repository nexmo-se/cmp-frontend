import { useState, useEffect } from "react";

interface StatsNumberProps {
  left: number;
  right: number;
}

function StatsNumber ({ left, right }: StatsNumberProps) {
  const [leftString, setLeftString] = useState("-");
  const [rightString, setRightString] = useState("-");

  useEffect(
    () => {
      if (!left) return;

      const leftString = left.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setLeftString(leftString);
    },
    [left]
  );
  
  useEffect(
    () => {
      if (!right) return;
      const rightString = right.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setRightString(rightString);
    },
    [right]
  )

  return `${leftString} / ${rightString}`
}
export default StatsNumber;