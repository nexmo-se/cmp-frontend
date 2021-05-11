import VoltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import Button from "components/Button";

interface AddButtonprops {
  children: any;
  onClick: () => void;
  disabled?: boolean;
  isAdding: boolean;
}

function AddButton ({ children, onClick, disabled, isAdding }: AddButtonprops) {
  return (
    <Button
      type="secondary"
      onClick={onClick}
      disabled={disabled}
    >
      {
        isAdding? (
          <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
        ): (
          <svg>
            <use xlinkHref={`${VoltaIcons}#Vlt-icon-plus`} />
          </svg>
        )
      }
      {children}
    </Button>
  )
}
export default AddButton;