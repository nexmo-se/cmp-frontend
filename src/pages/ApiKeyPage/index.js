import React from "react";
import uuid from "uuid/v4";

import AddButton from "components/AddButton";
import APIKeyTable from "components/APIKeyTable";
import AddAPIKeyModal from "components/AddAPIKeyModal";

function APIKeyPage(){
  const [ modalVisible, setModalVisible ] = React.useState(false);
  const [ refreshToken, setRefreshToken ] = React.useState(null);

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
        <div className="Vlt-col Vlt-right">
          <AddButton onClick={handleToggleModal}>Add New API Key</AddButton>
        </div>
      </div>
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <h5>ALL API KEYS</h5>
        </div>
      </div>
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <APIKeyTable 
            refreshToken={refreshToken} 
            setRefreshToken={setRefreshToken}
          />
        </div>
      </div>
      <AddAPIKeyModal 
        visible={modalVisible}
        setVisible={setModalVisible}
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default APIKeyPage;