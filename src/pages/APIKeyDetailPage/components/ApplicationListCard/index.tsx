import Application from "entities/application";
import { MouseEvent } from "react";
import { useHistory } from "react-router-dom";

import ApplicationTable from "components/ApplicationTable";

interface ApplicationListCardProps {
  applications: Application[];
}

function ApplicationListCard ({ applications }: ApplicationListCardProps) {
  const { push } = useHistory();

  function handleSeeAllClick (e: MouseEvent<HTMLLinkElement>) {
    e.preventDefault();
    push("/applications");
  }

  return (
    <div className="Vlt-col">
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__header">
          <p>Linked Applications</p>
        </div>
        <div className="Vlt-card__corner">
          <a className="Vlt-text-link" href="#" onClick={handleSeeAllClick}>See All</a> 
        </div>
        <div className="Vlt-card__content">
          <ApplicationTable applications={applications} preload compact />
        </div>
      </div>
    </div>
  )
}
export default ApplicationListCard;
