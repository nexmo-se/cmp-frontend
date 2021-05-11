import clsx from "clsx";
import { v4 as uuid } from "uuid";

import useStyles from "./style";
import { useState } from "react";

import AddButton from "components/AddButton";
import AddChannelModal from "components/AddChannelModal";

function Header(){
  const [modalVisible, setModalVisible] = useState(false);
  const mStyles = useStyles();

  function handleToggleModal(e){
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