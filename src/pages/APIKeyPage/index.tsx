import Header from "./components/Header";
import APIKeyTable from "components/APIKeyTable";
import APIKeyInformationCard from "components/APIKeyInformationCard";

function APIKeyPage () {
   return (
    <>
      <Header />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <APIKeyTable />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <APIKeyInformationCard />
        </div>
      </div>
    </>
  )
}
export default APIKeyPage;