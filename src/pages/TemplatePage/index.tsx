import TemplateTable from "components/TemplateTable";
import TemplateInformationCard from "components/TemplateInformationCard";
import Header from "./components/Header";

function TemplatePage(){
  return (
    <>
      <Header />
      <hr />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <TemplateTable />
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <TemplateInformationCard />
        </div>
      </div>
    </>
  )
}
export default TemplatePage;