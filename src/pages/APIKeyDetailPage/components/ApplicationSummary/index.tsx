import useStyles from "./styles";
import useError from "hooks/error";
import { useState } from "react";

import SuccessMessage from "entities/success";
import APIKey from "entities/apiKey";
import Application from "entities/application";

import AddApplicationModal from "components/AddApplicationModal";
import { Link } from "react-router-dom";


interface ApplicationSummaryProps {
  apiKey: ApiKey;
  applications: Application[];
}

function ApplicationSummary ({ apiKey, applications }: ApplicationSummaryProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const { throwSuccess } = useError();
  const mStyles = useStyles();

  function handleApplicationCreated () {
    toggleModal();
    const message = new SuccessMessage("Application has been created")
    throwSuccess(message);
  }

  function toggleModal () {
    setVisible((visible) => !visible);
  }

  return (
    <>
      <p>
        <b>Applications</b>
      </p>
      <h1 className={mStyles.title}>
        {applications.length}
      </h1>
      <div className="Vlt-grid Vlt-margin--A-top2">
        <div className="Vlt-col Vlt-center">
          <Link onClick={toggleModal}>
            Create Application
          </Link>
        </div>
      </div>
      <AddApplicationModal 
        visible={visible}
        setVisible={setVisible}
        apiKey={apiKey}
        onAdded={handleApplicationCreated}
        disableAPIKey
      />
    </>
  )
}
export default ApplicationSummary;