import clsx from "clsx";

interface NumberProps {
  number: number
  onClick: () => void;
  selected?: boolean;
}

function Number ({ number, onClick, selected }: NumberProps) {
  return (
    <li
      className={
        clsx({
          ["Vlt-table__pagination__current"]: selected
        })
      }
    >
      <a onClick={onClick}>
        {number}
      </a>
    </li>
  )
}
export default Number;
