import clsx from "clsx";

import useStyles from "./style";
import { useState } from "react";

import AddButton from "components/AddButton";
import AddChannelModal from "components/AddChannelModal";

function Header(){
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
        <h1 className={mStyles.title}>Channels</h1>
      </div>
      <div className="Vlt-col Vlt-right">
        <AddButton onClick={handleToggleModal}>Add New Channel</AddButton>
      </div>
    </div>
      <AddChannelModal 
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </>
  )
}
export default Header;