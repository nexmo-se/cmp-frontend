import ApplicationDropdown from "components/ApplicationDropdown";
import { useForm } from "../Form";

function ApplicationInput () {
  const { application, setApplication } = useForm();

  return (
    <ApplicationDropdown
      label="Application"
      value={application}
      onChange={setApplication}
    />
  )
}

export default ApplicationInput;
