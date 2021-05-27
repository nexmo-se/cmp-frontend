import clsx from "clsx";
import Button from "components/Button";

interface FilterButtonProps {
  id: string;
  currentFilter: string;
  label: string;
  onClick: (filter: string) => void;
}

function FilterButton ({ currentFilter, id, label, onClick }: FilterButtonProps) {
  function handleClick () {
    if (onClick) onClick(id);
  }

  return (
    <Button
      className={
        clsx({
          "Vlt-btn_active": currentFilter === id
        })
      }
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}

export default FilterButton;
