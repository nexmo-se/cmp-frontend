import React from "react";
import uuid from "uuid/v4";

import AddButton from "components/AddButton";
import ApplicationTable from "components/ApplicationTable";
import AddApplicationModal from "components/AddApplicationModal";

function ApplicationPage(){
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
          <AddButton onClick={handleToggleModal}>Add New Application</AddButton>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <h5>ALL APPLICATIONS</h5>
        </div>
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <ApplicationTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
        </div>
      </div>
      <AddApplicationModal 
        visible={modalVisible} 
        setVisible={setModalVisible} 
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default ApplicationPage;