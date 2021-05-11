import clsx from "clsx";
import { MouseEvent } from "react";

import useStyles from "./styles";
import { useState } from "react";

import AddButton from "components/AddButton";
import AddApplicationModal from "components/AddApplicationModal";

function Header () {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const mStyles = useStyles();

  function handleToggleModal (e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setModalVisible((prevVisible) => !prevVisible);
  }

  return (
    <>
      <div className="Vlt-grid">
        <div 
          className={
            clsx(
              "Vlt-col",
              mStyles.flexCenter
            )
          }
        >
          <h1 className={mStyles.title}>
            Applications
          </h1>
        </div>
        <div className="Vlt-col Vlt-right">
          <AddButton onClick={handleToggleModal}>
            Add New Application
          </AddButton>
        </div>
      </div>
      <AddApplicationModal 
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </>
  )
}
export default Header;