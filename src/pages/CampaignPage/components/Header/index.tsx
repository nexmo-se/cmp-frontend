import clsx from "clsx";

import useStyles from "./styles";
import { useState } from "react";

import AddButton from "components/AddButton";
import AddCampaignModal from "components/AddCampaignModal";

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
          <h1 className={mStyles.title}>Campaigns</h1>
        </div>
        <div className="Vlt-col Vlt-right">
          <AddButton onClick={handleToggleModal}>
            Add New Campaign
          </AddButton>
        </div>
      </div>
      <AddCampaignModal 
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </>
  )
}
export default Header;