import CampaignTable from "components/CampaignTable";
import Header from "./components/Header";

function CampaignPage () {
  return (
    <>
      <Header />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignTable />
        </div>
      </div>
    </>
  );
}
export default CampaignPage;