import clsx from "clsx";

import useStyles from "./styles";
import { useState } from "react";

import AddButton from "components/AddButton";
import AddTemplateModal from "components/AddTemplateModal";

function Header () {
  const [modalVisible, setModalVisible] = useState(false);
  const mStyles = useStyles();

  function handleToggleModal () {
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
          <h1 className={mStyles.title}>Templates</h1>
        </div>
        <div className="Vlt-col Vlt-right">
          <AddButton onClick={handleToggleModal}>
            Add New Template
          </AddButton>
        </div>
      </div>
      <AddTemplateModal 
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </>
  )
}
export default Header;