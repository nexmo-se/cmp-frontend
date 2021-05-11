import ApplicationTable from "components/ApplicationTable";
import ApplicationInformationCard from "components/ApplicationInformationCard";
import Header from "./components/Header";

function ApplicationPage () {
  return (
    <>
      <Header />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <ApplicationTable />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <ApplicationInformationCard />
        </div>
      </div>
    </>
  )
}
export default ApplicationPage;