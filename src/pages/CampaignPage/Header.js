import React from "react";
import clsx from "clsx";
import uuid from "uuid/v4";
import { makeStyles } from "@material-ui/styles";

import AddButton from "components/AddButton";
import RefreshButton from "components/RefreshButton";
import AddCampaignModal from "components/AddCampaignModal";

const useStyles = makeStyles(() => ({
  flexCenter: {
    display: "flex",
    alignItems: "center"
  },
  title: { marginBottom: 0 }
}))

function Header({ setRefreshToken }){
  const [ modalVisible, setModalVisible ] = React.useState(false);
  const mStyles = useStyles();

  function refreshTable(){
    setRefreshToken(uuid());
  }

  function handleToggleModal(e){
    e.preventDefault();
    setModalVisible((prevVisible) => !prevVisible);
  }

  function handleAdded(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <div className="Vlt-grid">
      <div 
        className={clsx(
          "Vlt-col",
          mStyles.flexCenter
        )}
      >
        <h1 className={mStyles.title}>Campaigns</h1>
      </div>
      <div className="Vlt-col Vlt-right">
        <RefreshButton onClick={refreshTable}/>
        <AddButton onClick={handleToggleModal}>Add New Campaign</AddButton>
      </div>
    </div>
      <AddCampaignModal 
        visible={modalVisible}
        setVisible={setModalVisible}
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default Header;